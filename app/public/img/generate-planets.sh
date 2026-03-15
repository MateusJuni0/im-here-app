#!/bin/bash
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
        echo "✗ Erro"
    fi
}

# Planeta 1: Planeta roxo/violeta tecnológico
generate_image "A stunning hyper-realistic 3D planet floating in space, deep purple and violet colors with glowing gold circuit patterns on the surface, volumetric clouds, atmospheric glow, lens flare, dark space background with stars, photorealistic, 8k ultra HD quality, cinematic lighting, NASA quality render" "planet-purple.png"

# Planeta 2: Planeta azul ciano futurista
generate_image "A beautiful hyper-realistic 3D planet in space, cyan and blue colors with bioluminescent glowing patterns, crystal-like surface features, ethereal atmosphere, dark space background with nebula, photorealistic render, 8k ultra HD, cinematic dramatic lighting" "planet-cyan.png"

# Planeta 3: Planeta dourado premium
generate_image "A majestic hyper-realistic 3D golden planet floating in deep space, metallic gold surface with intricate technological patterns, glowing energy veins, dramatic rim lighting, stars and galaxies in background, photorealistic, 8k ultra HD quality, premium aesthetic" "planet-gold.png"

echo "Planetas gerados!"
