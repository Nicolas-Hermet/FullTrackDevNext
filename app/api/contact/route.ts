import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  subject: string;
  description: string;
  recaptchaToken: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Récupérer les données du formulaire
    const body: ContactFormData = await request.json();
    const { name, email, topic, subject, description, recaptchaToken } = body;

    // 2. Validation des champs requis
    if (!name || !email || !topic || !subject || !description) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'Token reCAPTCHA manquant' },
        { status: 400 }
      );
    }

    // 3. Vérifier le token reCAPTCHA avec Google
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    // 4. Vérifier le score reCAPTCHA (v3 renvoie un score entre 0.0 et 1.0)
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error('reCAPTCHA verification failed:', recaptchaData);
      return NextResponse.json(
        {
          error: 'Vérification reCAPTCHA échouée. Veuillez réessayer.',
          score: recaptchaData.score,
        },
        { status: 400 }
      );
    }

    // 5. Configurer le transporteur Nodemailer avec Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true pour le port 465, false pour les autres ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 6. Configurer le contenu de l'email
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, // Expéditeur (votre Gmail)
      to: process.env.EMAIL_TO, // Destinataire (votre email)
      replyTo: email, // L'email du visiteur pour pouvoir répondre directement
      subject: `[Contact Form] ${topic} - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 5px;
              }
              .header {
                background: linear-gradient(to right, #4f46e5, #6366f1);
                color: white;
                padding: 20px;
                border-radius: 5px 5px 0 0;
                margin: -30px -30px 20px -30px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #4f46e5;
              }
              .value {
                margin-top: 5px;
                padding: 10px;
                background-color: #f9fafb;
                border-left: 3px solid #4f46e5;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #6b7280;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="content">
                <div class="header">
                  <h2 style="margin: 0;">Nouveau message depuis le formulaire de contact</h2>
                </div>

                <div class="field">
                  <div class="label">Nom :</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">Email :</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Sujet :</div>
                  <div class="value">${topic}</div>
                </div>

                <div class="field">
                  <div class="label">Objet :</div>
                  <div class="value">${subject}</div>
                </div>

                <div class="field">
                  <div class="label">Message :</div>
                  <div class="value">${description.replace(/\n/g, '<br>')}</div>
                </div>

                <div class="footer">
                  <p>Ce message a été envoyé depuis le formulaire de contact de FullTrackDev</p>
                  <p>Score reCAPTCHA : ${recaptchaData.score.toFixed(2)}/1.0</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        Nouveau message depuis le formulaire de contact

        Nom: ${name}
        Email: ${email}
        Sujet: ${topic}
        Objet: ${subject}

        Message:
        ${description}

        ---
        Score reCAPTCHA : ${recaptchaData.score}
      `,
    };

    // 7. Envoyer l'email
    await transporter.sendMail(mailOptions);

    // 8. Retourner une réponse de succès
    return NextResponse.json(
      {
        message: 'Email envoyé avec succès',
        recaptchaScore: recaptchaData.score,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'envoi du message",
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
