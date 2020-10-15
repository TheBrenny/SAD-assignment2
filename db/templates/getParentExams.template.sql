WITH cte_Activity AS (
    SELECT activityid, activityname, parentid
    FROM Activity
    WHERE activityid = ${activityid}
    UNION ALL
    SELECT e.activityid, e.activityname, e.parentid
    FROM Activity AS e
  		INNER JOIN cte_Activity AS p ON p.parentid = e.activityid
)
SELECT * FROM cte_Activity;