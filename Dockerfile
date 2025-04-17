# FROM node:18-alpine
# WORKDIR /frontend/
# COPY public/ /frontend/public
# COPY src/ /frontend/src
# COPY package.json /frontend/
# RUN npm install
# CMD ["npm", "start"]

FROM node:18-alpine

# Set working directory
WORKDIR /frontend/

# Copy package.json dan package-lock.json terlebih dahulu
COPY package.json package-lock.json /frontend/

# Install dependencies sebelum menyalin file lainnya (agar caching lebih optimal)
RUN npm install 

# Salin semua kode setelah dependencies terinstall
COPY . /frontend/

# Pastikan port 3000 terbuka
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
