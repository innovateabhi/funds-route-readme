import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "development-secret-key"
    )

    DEBUG = True

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql+psycopg2://"
        f"{os.getenv('DB_USER')}:"
        f"{os.getenv('DB_PASSWORD')}@"
        f"{os.getenv('DB_HOST', 'localhost')}:"
        f"{os.getenv('DB_PORT', '5432')}/"
        f"{os.getenv('DB_NAME')}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # =====================================================
    # SESSION
    # =====================================================

    # 300 seconds = 5 minutes
    PERMANENT_SESSION_LIFETIME = timedelta(seconds=300)

    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"

    # False for local HTTP development
    # True when using HTTPS in production
    SESSION_COOKIE_SECURE = False
