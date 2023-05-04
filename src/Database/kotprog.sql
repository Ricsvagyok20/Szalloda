SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE kotprog;

CREATE DATABASE IF NOT EXISTS kotprog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE kotprog;


CREATE TABLE foglalas (
  Szobaszam int(11) NOT NULL,
  Kezdete date NOT NULL,
  Vege date NOT NULL,
  Online tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI foglalas:
--   Szobaszam
--       szoba -> Szobaszam
--

--
-- A tábla adatainak kiíratása foglalas
--

INSERT INTO foglalas (Szobaszam, Kezdete, Vege, Online) VALUES
(1, '2022-11-06', '2022-11-10', 0),
(3, '2022-11-08', '2022-11-15', 1),
(4, '2022-11-10', '2022-11-17', 1),
(5, '2022-11-09', '2022-11-15', 1),
(6, '2022-11-11', '2022-11-18', 1),
(7, '2022-11-14', '2022-11-18', 0),
(9, '2022-11-11', '2022-11-13', 0),
(9, '2022-11-17', '2022-11-20', 1),
(10, '2022-11-10', '2022-11-13', 1),
(11, '2022-11-10', '2022-11-18', 1),
(2, '2022-11-15', '2022-11-17', 1),
(3, '2022-11-20', '2022-11-23', 0),
(8, '2022-11-05', '2022-11-09',1),
(20, '2022-11-17', '2022-11-27', 0),
(15, '2022-11-12', '2022-11-20', 1),
(16, '2022-11-04', '2022-11-08', 1),
(12, '2022-11-03', '2022-11-17', 1),
(13, '2022-11-20', '2022-11-30', 0),
(18, '2022-11-15', '2022-11-21', 0),
(19, '2022-11-11', '2022-11-24', 0);
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához program
--

CREATE TABLE program (
  Tipus varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Mettol date NOT NULL,
  Meddig date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI program:
--

--
-- A tábla adatainak kiíratása program
--

INSERT INTO program (Tipus, Mettol, Meddig) VALUES
('borkostolo', '2022-11-07', '2022-11-08'),
('borkostolo', '2022-11-11', '2022-11-12'),
('hajostura', '2022-11-12', '2022-11-13'),
('hajostura', '2022-11-16', '2022-11-18'),
('hegymaszas', '2022-11-10', '2022-11-12'),
('lovaglas', '2022-11-08', '2022-11-09'),
('lovaglas', '2022-11-16', '2022-11-18'),
('szorfozes', '2022-11-12', '2022-11-13'),
('tancest', '2022-11-18', '2022-11-19'),
('wellnessnap', '2022-11-11', '2022-11-12'),
('varosnezes', '2022-11-15', '2022-11-16'),
('varosnezes', '2022-11-17', '2022-11-18'),
('biciklitura', '2022-11-20', '2022-11-23'),
('biciklitura', '2022-11-11', '2022-11-14'),
('biciklitura', '2022-11-25', '2022-11-28'),
('lovaglas', '2022-11-18', '2022-11-20'),
('lovaglas', '2022-11-12', '2022-11-14'),
('borkostolo', '2022-11-26', '2022-11-27'),
('borkostolo', '2022-11-18', '2022-11-19'),
('szorfozes', '2022-11-05', '2022-11-06'),
('tancest', '2022-11-21', '2022-11-22');
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához resztvesz
--

CREATE TABLE resztvesz (
  Szemelyi_igazolvany_szam int(11) NOT NULL,
  Tipus varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Mettol date NOT NULL,
  Meddig date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI resztvesz:
--   Tipus
--       program -> Tipus
--   Mettol
--       program -> Mettol
--   Meddig
--       program -> Meddig
--   Szemelyi_igazolvany_szam
--       vendeg -> Szemelyi_igazolvany_szam
--

--
-- A tábla adatainak kiíratása resztvesz
--

INSERT INTO resztvesz (Szemelyi_igazolvany_szam, Tipus, Mettol, Meddig) VALUES
(24856791, 'hajostura', '2022-11-12', '2022-11-13'),
(24876325, 'wellnessnap', '2022-11-11', '2022-11-12'),
(52876953, 'hegymaszas', '2022-11-10', '2022-11-12'),
(54632188, 'szorfozes', '2022-11-12', '2022-11-13'),
(64478542, 'lovaglas', '2022-11-16', '2022-11-18'),
(64478542, 'tancest', '2022-11-18', '2022-11-19'),
(74152638, 'szorfozes', '2022-11-12', '2022-11-13'),
(76543478, 'borkostolo', '2022-11-07', '2022-11-08'),
(76543478, 'lovaglas', '2022-11-08', '2022-11-09'),
(76651234, 'hajostura', '2022-11-16', '2022-11-18'),
(12345678, 'biciklitura', '2022-11-20', '2022-11-23'),
(94832175, 'lovaglas', '2022-11-18', '2022-11-20'),
(12785437, 'varosnezes', '2022-11-15', '2022-11-16'),
(43256781, 'borkostolo', '2022-11-26', '2022-11-27'),
(76651234, 'tancest', '2022-11-21', '2022-11-22'),
(96847328, 'borkostolo', '2022-11-18', '2022-11-19'),
(45632156, 'szorfozes', '2022-11-05', '2022-11-06'),
(53278421, 'varosnezes', '2022-11-17', '2022-11-18'),
(89236532, 'lovaglas', '2022-11-12', '2022-11-14'),
(74152638, 'tancest', '2022-11-18', '2022-11-19');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához szoba
--

CREATE TABLE szoba (
  Szobaszam int(11) NOT NULL,
  Szemelyek_szama int(11) NOT NULL,
  Erkely tinyint(1) NOT NULL,
  Agymeret int(11) NOT NULL,
  Tipus varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI szoba:
--   Tipus
--       szobatipus -> Tipus
--

--
-- A tábla adatainak kiíratása szoba
--

INSERT INTO szoba (Szobaszam, Szemelyek_szama, Erkely, Agymeret, Tipus) VALUES
(1, 1, 0, 200, 'szolo'),
(2, 1, 1, 200, 'szolo'),
(3, 2, 0, 400, 'paros'),
(4, 4, 1, 800, 'csaladi'),
(5, 5, 1, 1000, 'csaladi'),
(6, 10, 1, 2000, 'tobbagyas'),
(7, 50, 0, 0, 'konferenciaterem'),
(8, 35, 0, 0, 'konferenciaterem'),
(9, 100, 0, 0, 'balterem'),
(10, 80, 0, 0, 'balterem'),
(11, 8, 1, 1600, 'tobbagyas'),
(12, 5, 0, 1000, 'tobbagyas'),
(13, 80, 0, 0, 'balterem'),
(14, 2, 1, 400, 'paros'),
(15, 10, 0, 2000, 'tobbagyas'),
(16, 4, 1, 800, 'csaladi'),
(17, 6, 1, 1200, 'tobbagyas'),
(18, 1, 1, 200, 'szolo'),
(19, 30, 0, 0, 'konferenciaterem'),
(20, 1, 0, 200, 'szolo');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához szobatipus
--

CREATE TABLE szobatipus (
  Tipus varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Furdoszoba varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Legkondi tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI szobatipus:
--

--
-- A tábla adatainak kiíratása szobatipus
--

INSERT INTO szobatipus (Tipus, Furdoszoba, Legkondi) VALUES
('balterem', 'sajat', 1),
('csaladi', 'dupla', 1),
('konferenciaterem', 'nincs', 1),
('paros', 'sajat', 1),
('szolo', 'emeleten', 0),
('tobbagyas', 'sajat', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához vendeg
--

CREATE TABLE vendeg (
  Szemelyi_igazolvany_szam int(11) NOT NULL,
  Vezeteknev varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Keresztnev varchar(20) COLLATE utf8mb4_hungarian_ci NOT NULL,
  E_mail varchar(30) COLLATE utf8mb4_hungarian_ci NOT NULL,
  Jelszo varchar(20) NOT NULL,
  Szobaszam int(11) NOT NULL,
  Kezdete date NOT NULL,
  Vege date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- TÁBLA KAPCSOLATAI vendeg:
--   Szobaszam
--       foglalas -> Szobaszam
--   Kezdete
--       foglalas -> Kezdete
--   Vege
--       foglalas -> Vege
--

--
-- A tábla adatainak kiíratása vendeg
--

INSERT INTO vendeg (Szemelyi_igazolvany_szam, Vezeteknev, Keresztnev, E_mail, Jelszo, Szobaszam, Kezdete, Vege) VALUES
(12345678, 'Orosz', 'Aron', 'oroszaron97@gmail.com', 'aron123', 3, '2022-11-08', '2022-11-15'),
(24856791, 'Pinter', 'Mihaly', 'pintermihaly96@citromail.hu', 'mihaly123', 6, '2022-11-11', '2022-11-18'),
(24876325, 'Barta', 'Izabella', 'bartaizabella79@freemail.hu', 'izabella123', 9, '2022-11-11', '2022-11-13'),
(52876953, 'Nemeth', 'Aron', 'nemetharon88@gmail.com', 'aron123', 4, '2022-11-10', '2022-11-17'),
(54632188, 'Szabo', 'Klaudia', 'szaboklaudia90@gmail.com', 'klaudia123', 5, '2022-11-09', '2022-11-15'),
(64478542, 'Vass', 'Oliver', 'vassoliver92@gmail.com', 'oliver123', 9, '2022-11-17', '2022-11-20'),
(74152638, 'Torok', 'Arpad', 'torokarpad88@gmail.com', 'arpad123', 11, '2022-11-10', '2022-11-18'),
(76543478, 'Hajdu', 'Peter', 'hajdupeter00@citromail.hu', 'peter123', 1, '2022-11-06', '2022-11-10'),
(76651234, 'Horvath', 'Zsolt', 'horvathzsolt85@freemail.hu', 'zsolt123', 7, '2022-11-14', '2022-11-18'),
(45632156, 'Hegedus', 'Gabor', 'hegedusgabor22@gmail.com', 'gabor123', 20, '2022-11-17', '2022-11-27'),
(94832175, 'Bogdan', 'Csenge', 'bogdancsenge78@gmail.com', 'csenge123', 8, '2022-11-05', '2022-11-09'),
(89547236, 'Sandor', 'Katalin', 'sandorkatalin44@gmail.com', 'katalin123', 12, '2022-11-03', '2022-11-17'),
(12345634, 'Milan', 'Simon', 'milansimon34@gmail.com', 'simon123', 13, '2022-11-20', '2022-11-30'),
(43256781, 'Kiss', 'Nikoletta', 'kissnikoletta45@gmail.com', 'nikoletta123', 18, '2022-11-15', '2022-11-21'),
(12785437, 'Antal', 'Kornel', 'antalkornel95@gmail.com', 'kornel123', 19, '2022-11-11', '2022-11-24'),
(43869213, 'Veres', 'Rudolf', 'veresrudolf23@gmail.com', 'rudolf123', 3, '2022-11-20', '2022-11-23'),
(53278421, 'Matyas', 'Tamas', 'matyastamas84@gmail.com', 'tamas123', 16, '2022-11-04', '2022-11-08'),
(96847328, 'Illes', 'Richard', 'illesrichard99@gmail.com', 'richard123', 15, '2022-11-12', '2022-11-20'),
(73426589, 'Hortvath', 'Bence', 'horvathbence68@gmail.com', 'bence123', 10, '2022-11-10', '2022-11-13'),
(89236532, 'Antal', 'Kornel', 'antalkornel95@gmail.com', 'kornel123', 2, '2022-11-15', '2022-11-17');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei foglalas
--
ALTER TABLE foglalas
  ADD PRIMARY KEY (Szobaszam,Kezdete,Vege),
  ADD KEY Szobaszam (Szobaszam,Kezdete,Vege);

--
-- A tábla indexei program
--
ALTER TABLE program
  ADD PRIMARY KEY (Tipus,Mettol,Meddig),
  ADD KEY Tipus (Tipus,Mettol,Meddig);

--
-- A tábla indexei resztvesz
--
ALTER TABLE resztvesz
  ADD PRIMARY KEY (Szemelyi_igazolvany_szam,Tipus,Mettol,Meddig),
  ADD KEY Szemelyi_igazolvany_szam (Szemelyi_igazolvany_szam,Tipus,Mettol,Meddig),
  ADD KEY resztvesz_program (Tipus,Mettol,Meddig);

--
-- A tábla indexei szoba
--
ALTER TABLE szoba
  ADD PRIMARY KEY (Szobaszam),
  ADD KEY Szobaszam (Szobaszam),
  ADD KEY Tipus (Tipus);

--
-- A tábla indexei szobatipus
--
ALTER TABLE szobatipus
  ADD PRIMARY KEY (Tipus),
  ADD KEY Tipus (Tipus);

--
-- A tábla indexei vendeg
--
ALTER TABLE vendeg
  ADD PRIMARY KEY (Szemelyi_igazolvany_szam),
  ADD KEY Szemelyi_igazolvany_szam (Szemelyi_igazolvany_szam,Szobaszam,Kezdete,Vege),
  ADD KEY vendeg_foglalas (Szobaszam,Kezdete,Vege);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához foglalas
--
ALTER TABLE foglalas
  ADD CONSTRAINT foglalas_szobaszam FOREIGN KEY (Szobaszam) REFERENCES szoba (Szobaszam) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához resztvesz
--
ALTER TABLE resztvesz
  ADD CONSTRAINT resztvesz_program FOREIGN KEY (Tipus,Mettol,Meddig) REFERENCES program (Tipus, Mettol, Meddig) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT resztvesz_szemelyi FOREIGN KEY (Szemelyi_igazolvany_szam) REFERENCES vendeg (Szemelyi_igazolvany_szam) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához szoba
--
ALTER TABLE szoba
  ADD CONSTRAINT szoba_tipus FOREIGN KEY (Tipus) REFERENCES szobatipus (Tipus) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához vendeg
--
ALTER TABLE vendeg
  ADD CONSTRAINT vendeg_foglalas FOREIGN KEY (Szobaszam,Kezdete,Vege) REFERENCES foglalas (Szobaszam, Kezdete, Vege) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
