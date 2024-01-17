export const homeStatusQuery = `SELECT
t.id,
t.team_name AS teamName,
COALESCE(h.matches, 0) AS matches,
COALESCE(h.favor_goals, 0) AS favorGoals,
COALESCE(h.own_goals, 0) AS ownGoals,
COALESCE(h.balance, 0) AS balance,
COALESCE(h.wins, 0) AS wins,
COALESCE(h.draws, 0) AS draws,
COALESCE(h.loss, 0) AS loss
FROM teams t
LEFT JOIN (
SELECT
  home_team_id,
  COUNT(home_team_id) AS matches,
  SUM(home_team_goals) AS favor_goals,
  SUM(away_team_goals) AS own_goals,
  SUM(home_team_goals - away_team_goals) AS balance,
  SUM(home_team_goals > away_team_goals) AS wins,
  SUM(home_team_goals = away_team_goals) AS draws,
  SUM(home_team_goals < away_team_goals) AS loss
FROM matches
WHERE in_progress = 0
GROUP BY home_team_id
) h ON t.id = h.home_team_id;`;

export const awayStatusQuery = `SELECT
t.id,
t.team_name AS teamName,
COALESCE(a.matches, 0) AS matches,
COALESCE(a.favor_goals, 0) AS favorGoals,
COALESCE(a.own_goals, 0) AS ownGoals,
COALESCE(a.balance, 0) AS balance,
COALESCE(a.wins, 0) AS wins,
COALESCE(a.draws, 0) AS draws,
COALESCE(a.loss, 0) AS loss
FROM teams t
LEFT JOIN (
SELECT
  away_team_id,
  COUNT(away_team_id) AS matches,
  SUM(away_team_goals) AS favor_goals,
  SUM(home_team_goals) AS own_goals,
  SUM(away_team_goals - away_team_goals) AS balance,
  SUM(CASE WHEN away_team_goals > home_team_goals THEN 1 ELSE 0 END) AS wins,
  SUM(CASE WHEN away_team_goals = home_team_goals THEN 1 ELSE 0 END) AS draws,
  SUM(CASE WHEN away_team_goals < home_team_goals THEN 1 ELSE 0 END) AS loss
FROM matches
WHERE in_progress = 0
GROUP BY away_team_id
) a ON t.id = a.away_team_id;`;
