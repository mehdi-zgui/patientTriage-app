from database import engine
from sqlalchemy import text


def add_personnel(data):

    with engine.connect() as conn:
        trans = conn.begin()
        insert_query = text(
            """
            INSERT INTO personnel (cin_personnel, full_name, date_of_birth, personnel_type, service, phone_number, email, password)
            VALUES (:cin, :name, :date, :type, :service, :tel, :email, :password)
        """
        )

        conn.execute(
            insert_query,
            {
                "cin": data["cin"],
                "name": data["name"],
                "date": data["date"],
                "type": data["type"],
                "service": data["service"],
                "tel": data["tel"],
                "email": data["email"],
                "password": data["password"],
            },
        )
        # Commit the transaction
        trans.commit()
        return True
    

def check_personnel(data):

    with engine.connect() as conn:
        trans = conn.begin()
        query = text(
            """
            select * from personnel where cin_personnel = :cin and password = :password
        """
        )

        result = conn.execute(
            query,
            {
                "cin": data['cin'],
                'password': data['password'],
            },
        )
        all_results = result.all()
        trans.commit()
        if all_results:
            personnel = all_results[
                0
            ]._asdict()  # Convert the first result to a dictionary
            return personnel
        else:
            return None
        

def search_profile(cin):

    with engine.connect() as conn:
        trans = conn.begin()
        query = text(
            """
            select * from personnel where cin_personnel = :cin
        """
        )

        result = conn.execute(
            query,
            {
                "cin": cin,
            },
        )
        all_results = result.all()
        trans.commit()
        if all_results:
            profile = all_results[
                0
            ]._asdict()  # Convert the first result to a dictionary
            return profile
        else:
            return None


def update_personnel(data):

    with engine.connect() as conn:
        trans = conn.begin()
        update_query = text(
            """
            UPDATE personnel
            SET full_name = :name, date_of_birth = :date, phone_number = :tel, email = :email, password = :password
            WHERE cin_personnel = :cin;
        """
        )

        conn.execute(
            update_query,
            {
                "cin": data["cin"],
                "name": data["name"],
                "date": data["date"],
                "tel": data["tel"],
                "email": data["email"],
                "password": data["password"],
            },
        )
        # Commit the transaction
        trans.commit()
        return True