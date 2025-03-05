#!/bin/sh

# Arrêt en cas d'erreur
set -e

# Configurer Git avec le token d'authentification
git config --global url."https://${Smash_Arena_Event_Site_globale}@github.com".insteadOf "https://github.com"

# Mettre à jour les sous-modules
git submodule update --init --recursive

# Autres étapes nécessaires pour le build, comme npm install
npm install

# Génération du build (ajustez selon votre framework)
npm run build

# Vérification du contenu du dossier de build
ls -la dist