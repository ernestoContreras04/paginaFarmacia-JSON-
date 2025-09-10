/**
 * API Route de Vercel para servir productos desde Firebase Storage
 * Equivalente al proxy Python pero usando funciones serverless
 */

export default async function handler(req, res) {
    // Configurar headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Solo permitir GET
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        console.log('🔄 Cargando JSON desde Firebase Storage...');
        
        // URL del archivo JSON en Firebase Storage
        const firebaseUrl = 'https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media&token=bd9be4f5-e908-49e5-8cf2-32e6c4cec290';
        
        console.log('📁 URL de Firebase:', firebaseUrl);
        
        // Crear request con headers apropiados
        const response = await fetch(firebaseUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log(`✅ JSON cargado exitosamente: ${data.productos?.length || 0} productos`);
        
        // Devolver el JSON con headers CORS
        res.status(200).json(data);
        
    } catch (error) {
        console.error('❌ Error al cargar desde Firebase Storage:', error);
        
        // En caso de error, devolver un JSON con productos de ejemplo
        const fallbackData = {
            metadata: {
                fecha_generacion: new Date().toISOString(),
                total_productos: 4,
                fuente: "Fallback - Productos de ejemplo",
                version: "1.0"
            },
            productos: [
                {
                    nombre: "Physiopure - Gel espuma",
                    descripcion: "Productos limpiadores y desmaquillantes que oxigenan la piel",
                    precio: 18.90,
                    categoria: "Cuidado Personal",
                    marca: "Physiopure",
                    imagen: "fotosCatalogo/Physiopure - Gel espuma - Productos limpiadores y desmaquillantes que oxigenan la piel - 18,90e.png"
                },
                {
                    nombre: "Sebiaclear - Gel espumoso",
                    descripcion: "Piel propensa al acné",
                    precio: 18.90,
                    categoria: "Dermatología",
                    marca: "Sebiaclear",
                    imagen: "fotosCatalogo/Sebiaclear - Gel espumoso - Piel propensa al acné - 18,90e.png"
                },
                {
                    nombre: "Sensifine - Bálsamo desmaquillante",
                    descripcion: "Pieles sensibles, reactivas e intolerantes",
                    precio: 17.90,
                    categoria: "Cuidado Personal",
                    marca: "Sensifine",
                    imagen: "fotosCatalogo/Sensifine - Bálsamo desmaquillante - Pieles sensibles, reactivas e intolerantes 17,90e.png"
                },
                {
                    nombre: "Topialyse - Aceite limpiador",
                    descripcion: "Piel muy seca a atópica",
                    precio: 22.90,
                    categoria: "Dermatología",
                    marca: "Topialyse",
                    imagen: "fotosCatalogo/Topialyse - Aceite limpiador - Piel muy seca a atópica 22.90e.png"
                }
            ]
        };
        
        res.status(200).json(fallbackData);
    }
}
