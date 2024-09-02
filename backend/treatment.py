from database import engine
from sqlalchemy import text


def add_treatment(data):

    with engine.connect() as conn:
        trans = conn.begin()
        insert_query = text(
            """
            INSERT INTO treatment (consultation_id, cin_personnel, treatment_description)
            VALUES (:consult_id, :cinPer, :treatment)
        """
        )

        conn.execute(
            insert_query,
            {
                "consult_id": data["consult_id"],
                "cinPer": data["cinPer"],
                "treatment": data["treatment"],
            },
        )
        # Commit the transaction
        trans.commit()
        return True