from flask_apscheduler import APScheduler
from server import create_app, run_background_task, port_number


class Config(object):
    JOBS = [
        {
            'id': 'background_task',
            'func': 'main:background_task',
            'trigger': 'interval',
            'seconds': 5
        }
    ]

    SCHEDULER_API_ENABLED = True


def background_task():
    run_background_task()


if __name__ == '__main__':
    app = create_app()
    app.config.from_object(Config())
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()
    app.run(debug=True, host='0.0.0.0', port=port_number, use_reloader=False)
