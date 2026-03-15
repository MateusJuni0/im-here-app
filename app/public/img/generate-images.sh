#!/bin/bash
# Script para gerar imagens 3D com OpenAI
# Requer OPENAI_API_KEY no ambiente

API_KEY="${OPENAI_API_KEY}"

generate_image() {
    local prompt="$1"
    local output="$2"
    
    echo "Gerando: $output"
    
    response=$(curl -s https://api.openai.com/v1/images/generations \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $API_KEY" \
        -d "{
            \"model\": \"dall-e-3\",
            \"prompt\": \"$prompt\",
            \"n\": 1,
            \"size\": \"1024x1024\",
            \"quality\": \"hd\"
        }")
    
    url=$(echo "$response" | jq -r '.data[0].url')
    
    if [ "$url" != "null" ] && [ -n "$url" ]; then
        curl -s "$url" -o "$output"
        echo "✓ Salvo: $output"
    else
        echo "✗ Erro ao gerar $output"
        echo "$response"
    fi
}

# Imagem 1: Planeta tecnológico para ebooks
generate_image "A futuristic 3D glowing purple and gold sphere floating in dark space with digital circuit patterns, holographic data streams, and subtle particle effects. Premium tech aesthetic, dark background #0a0a0f, cinematic lighting, 8k quality, minimalist and elegant" "planet-ebook.png"

# Imagem 2: Fundo para websites
generate_image "A stunning 3D abstract composition with floating geometric shapes, glowing purple gradients transitioning to gold accents, subtle grid patterns, and soft light rays. Dark tech background, futuristic digital art style, premium quality, 8k resolution" "bg-websites.png"

# Imagem 3: Fundo para apps/mobile
generate_image "A sleek 3D smartphone floating with holographic UI elements, purple and cyan glow effects, digital particles around it, dark futuristic background. Premium tech product visualization, 8k quality, cinematic lighting" "bg-apps.png"

# Imagem 4: Fundo para IA/automação
generate_image "A sophisticated 3D robot head made of translucent purple crystal with glowing gold neural pathways inside, floating in dark space with data streams and particles. Futuristic AI concept, premium quality, 8k, dark background" "bg-ai.png"

echo "Geração completa!"
