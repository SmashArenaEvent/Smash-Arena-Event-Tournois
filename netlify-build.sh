#!/bin/sh

# Configurer Git avec le token d'authentification
git config --global url."https://${Smash_Arena_Event_Site_globale}@github.com".insteadOf "https://github.com"

# Mettre à jour les sous-modules
git submodule update --init --recursive

# Autres étapes nécessaires pour le build, comme npm install
npm install
