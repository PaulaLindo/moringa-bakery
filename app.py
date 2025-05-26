from flask import Flask, send_file

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return open('index.html', encoding='utf-8').read()

if __name__ == '__main__':
    app.run(debug=True)