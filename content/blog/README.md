# Blog Articles - Multilingual Support

Ce dossier contient les articles de blog avec support multilingue.

## Structure

```
content/blog/
├── fr/           # Articles en français (langue par défaut)
│   ├── article-1.mdx
│   ├── article-2.mdx
│   └── ...
└── en/           # Articles traduits en anglais
    ├── article-1.mdx  # Traduction de l'article-1
    └── ...
```

## Comment traduire un article

### 1. Identifier l'article à traduire

Les articles français sont dans `content/blog/fr/`. Par exemple : `albi-retour-emu.mdx`

### 2. Créer la version traduite

Copiez l'article dans le dossier de la langue cible avec **le même nom de fichier** :

```bash
# Exemple : traduire en anglais
cp content/blog/fr/albi-retour-emu.mdx content/blog/en/albi-retour-emu.mdx
```

⚠️ **Important** : Le nom du fichier doit être identique dans toutes les langues pour que le système de fallback fonctionne.

### 3. Traduire le contenu

Ouvrez le fichier traduit et traduisez :
- Le **frontmatter** (métadonnées en haut du fichier)
- Le **contenu** de l'article

```mdx
---
title: "Albi: An Emotional Return"  # ← Traduire
summary: "After a difficult start..."  # ← Traduire
publishedAt: "2024-09-15"  # ← Garder la même date
image: "/images/blog/albi.jpg"  # ← Garder le même chemin
category: "Motorsport"  # ← Traduire si nécessaire
---

Votre contenu traduit ici...
```

## Système de fallback

Le système fonctionne automatiquement :

### Pour la locale `fr` (français)
- Affiche les articles de `content/blog/fr/`

### Pour la locale `en` (anglais)
1. Cherche d'abord dans `content/blog/en/`
2. Si l'article n'existe pas en anglais, affiche la version française (`content/blog/fr/`)

### Exemple

Avec cette structure :
```
content/blog/
├── fr/
│   ├── article-1.mdx
│   ├── article-2.mdx
│   └── article-3.mdx
└── en/
    └── article-1.mdx  # Seul article-1 est traduit
```

**Résultat sur `/en/blog` :**
- `article-1` → Version anglaise ✅
- `article-2` → Version française (fallback) 🔄
- `article-3` → Version française (fallback) 🔄

## URLs

Les URLs incluent automatiquement la locale :

- `/fr/blog/albi-retour-emu` → Version française
- `/en/blog/albi-retour-emu` → Version anglaise (ou française si pas traduit)

## Bonnes pratiques

1. **Gardez le même slug** : Le nom de fichier doit être identique dans toutes les langues
2. **Traduisez progressivement** : Pas besoin de tout traduire d'un coup
3. **Dates identiques** : Gardez la même date de publication dans toutes les langues
4. **Images** : Utilisez les mêmes chemins d'images (ou créez des versions localisées si nécessaire)

## Vérification

Pour vérifier que tout fonctionne :

```bash
# Build le projet
npm run build

# Vérifier les routes générées
# Vous devriez voir :
# - /en/blog/article-1 (version anglaise)
# - /fr/blog/article-1 (version française)
```
