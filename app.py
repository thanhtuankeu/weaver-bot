import oyaml as yaml
from flask import Flask
from flask import render_template
import os

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
portDD = int(os.environ.get("PORT", 17995))

@app.route('/')
def index():
    website_data = yaml.load(open('_config.yaml'))

    return render_template('index.html', data=website_data)


if __name__ == '__main__':
    app.run(host ='0.0.0.0',debug=True, port=portDD)
