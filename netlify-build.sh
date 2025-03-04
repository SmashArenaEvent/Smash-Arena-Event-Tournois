#!/bin/sh

# Configurer Git avec le token d'authentification
git config --global url."https://${GITHUB_TOKEN}@github.com".insteadOf "https://github.com"

# Mettre à jour les sous-modules
git submodule update --init --recursive

# Autres étapes nécessaires pour le build, comme npm install
npm install
