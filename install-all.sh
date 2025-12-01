#!/bin/bash

# Script pour installer les dépendances dans tous les projets
echo "Installation des dépendances dans tous les projets..."

for dir in */; do
    if [ -f "$dir/package.json" ]; then
        echo ""
        echo "====================================="
        echo "Installation dans: $dir"
        echo "====================================="
        cd "$dir"
        npm install
        cd ..
    fi
done

echo ""
echo "✓ Installation terminée dans tous les projets!"
