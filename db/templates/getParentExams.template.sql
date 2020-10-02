WITH cte_Exam AS (
    SELECT examid, examname, parentid
    FROM Exam
    WHERE examid = 5
    UNION ALL
    SELECT e.examid, e.examname, e.parentid
    FROM Exam AS e
  		INNER JOIN cte_Exam AS p ON p.parentid = e.examid
)
SELECT * FROM cte_Exam;