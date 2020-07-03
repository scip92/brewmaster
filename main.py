from server import create_app
from server import port_number

if __name__ == '__main__':
    create_app().run(debug=True, host='0.0.0.0', port=port_number)