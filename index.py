from flask import Flask
from flask import jsonify, redirect, request, session, url_for
from flask_mysqldb import MySQL, MySQLdb
from flask_mail import Mail, Message
from flask_cors import CORS

import secrets
from datetime import datetime, timedelta

app = Flask(__name__, template_folder='templates')


app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='sags'
app.config['MYSQL_CURSORCLASS']='DictCursor'
mysql=MySQL(app)

# Configuración de Flask-CORS para permitir la comunicación con React
CORS(app, supports_credentials=True)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'softwareanalysissa@gmail.com'
app.config['MAIL_PASSWORD'] = 'kwsv tbct pxwi nczi'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

gmail = Mail(app)

#funcion de login para validar usuario y contraceñá
@app.route('/api/login', methods=["GET", "POST"])
def login():
    
    if request.method == 'POST':
        data = request.json # Resibe los datos como json desde react
        correo = data.get('correo')
        clave = data.get('clave')
            
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE email = %s LIMIT 1', (correo,))
        account = cur.fetchone()
        cur.close()
            
        if account:
            cur = mysql.connection.cursor()
            cur.execute("SELECT (aes_decrypt(password,'AES')) AS cifrado FROM usuarios WHERE email = %s Limit 1", (correo,))
            clave_cifrada = cur.fetchone()
            
            # Verificar si la contraseña es correcta
            if clave_cifrada['cifrado'].decode('utf-8') == clave:

                session['logueado'] = True
                session['nombre'] = account['nombres']
                session['id'] = account['email']
                
                return jsonify({"succes": True, 
                                "message": "Inicio de Sesion Exitoso", 
                                "nombre": account['nombres']
                                })
            else:
                # Contraseña incorrecta
                return jsonify({"success": False, "message": "Contraseña incorrecta"}), 401
        else:
            # Usuario no encontrado
            return jsonify({"success": False, "message": "Usuario no encontrado"}), 404
#Finaliza funcion login


# Endpoint para cerrar sesión (logout)
@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop("logueado", None)
    session.pop("nombre", None)
    session.pop("id", None)
    return jsonify({"success": True, "message": "Sesión cerrada correctamente"})


if __name__ == '__main__':
    app.secret_key="4546416vblñvkbmgvlñkbjfgñfglñv.ñ"
    app.run(debug=True)