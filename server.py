from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import urllib.parse
import json

class CORSProxyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Si la petición es para el archivo JSON, hacer proxy a Firebase
        if self.path == '/products.json':
            try:
                # URL de Firebase Storage (reemplaza con tu URL real)
                firebase_url = "https://firebasestorage.googleapis.com/v0/b/farmacia-9737f.firebasestorage.app/o/data%2Fproducts.json?alt=media"
                
                # Hacer la petición a Firebase
                req = urllib.request.Request(firebase_url)
                with urllib.request.urlopen(req) as response:
                    data = response.read()
                
                # Enviar respuesta con headers CORS
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.end_headers()
                self.wfile.write(data)
                return
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(f"Error: {str(e)}".encode())
                return
        
        # Para otros archivos, servir normalmente
        return SimpleHTTPRequestHandler.do_GET(self)
    
    def do_OPTIONS(self):
        # Manejar preflight CORS requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, CORSProxyHandler)
    print('Servidor ejecutándose en http://localhost:8000')
    print('Proxy CORS habilitado para Firebase Storage')
    httpd.serve_forever()
