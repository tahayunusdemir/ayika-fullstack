# 1. Python base imajını seç
FROM python:3.11-slim-buster

# 2. Ortam değişkenlerini ayarla
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 3. Çalışma dizinini oluştur ve ayarla
WORKDIR /app

# 4. Sistem bağımlılıklarını güncelle ve kur (gerekirse)
# RUN apt-get update && apt-get install -y ...

# 5. Bağımlılıkları kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Proje kodunu kopyala
COPY . .

# 7. Port'u açığa çıkar (docker-compose'da belirtilecek)
EXPOSE 8000 