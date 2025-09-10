#!/usr/bin/env python3
"""
Servidor proxy para cargar JSON desde Firebase Storage
Soluciona problemas de CORS al servir desde localhost
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import json
import sys
from urllib.error import URLError, HTTPError

class CORSProxyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers CORS para permitir acceso desde localhost
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        if self.path == '/products.json':
            self.serve_firebase_json()
        else:
            super().do_GET()

    def serve_firebase_json(self):
        """Cargar JSON desde Firebase Storage y servirlo con CORS"""
        try:
            # URL del archivo JSON en Firebase Storage
            firebase_url = 'https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media&token=bd9be4f5-e908-49e5-8cf2-32e6c4cec290'
            
            print(f"🔄 Cargando JSON desde Firebase Storage: {firebase_url}")
            
            # Crear request con headers apropiados
            req = urllib.request.Request(firebase_url)
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
            
            # Hacer la petición
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    data = response.read()
                    
                    # Verificar que es JSON válido
                    try:
                        json_data = json.loads(data.decode('utf-8'))
                        print(f"✅ JSON cargado exitosamente: {len(json_data.get('productos', []))} productos")
                        
                        # Servir el JSON con headers CORS
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json; charset=utf-8')
                        self.send_header('Access-Control-Allow-Origin', '*')
                        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                        self.end_headers()
                        self.wfile.write(data)
                        
                    except json.JSONDecodeError as e:
                        print(f"❌ Error al parsear JSON: {e}")
                        self.send_error(500, "Error al parsear JSON")
                        
                else:
                    print(f"❌ Error HTTP: {response.status}")
                    self.send_error(response.status, f"Error HTTP: {response.status}")
                    
        except HTTPError as e:
            print(f"❌ Error HTTP: {e.code} - {e.reason}")
            self.send_error(e.code, f"Error HTTP: {e.reason}")
            
        except URLError as e:
            print(f"❌ Error de URL: {e.reason}")
            self.send_error(500, f"Error de URL: {e.reason}")
            
        except Exception as e:
            print(f"❌ Error inesperado: {e}")
            self.send_error(500, f"Error inesperado: {e}")

def run_proxy_server(port=8000):
    """Ejecutar el servidor proxy"""
    try:
        with socketserver.TCPServer(("", port), CORSProxyHandler) as httpd:
            print(f"🚀 Servidor proxy iniciado en puerto {port}")
            print(f"📁 Sirviendo archivos estáticos desde: {httpd.server_address}")
            print(f"🔗 Accede a: http://localhost:{port}")
            print(f"📦 JSON disponible en: http://localhost:{port}/products.json")
            print("=" * 50)
            print("💡 Presiona Ctrl+C para detener el servidor")
            print("=" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error al iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_proxy_server()
