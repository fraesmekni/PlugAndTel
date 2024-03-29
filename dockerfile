# Utiliser l'image Node.js
FROM node:14
FROM mongo:latest

# Ajoutez des configurations ou des scripts d'initialisation si nécessaire

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port de votre application
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["nodemon", "server"]
