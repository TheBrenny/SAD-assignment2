-- Attendance;
-- ClassGroup;
-- Activity;
-- Student;
-- AttendanceRecord;
-- ActivityCompleted;

INSERT INTO Student (studentID, firstName, lastName, dob, groupID) VALUES
  (1, "Jarod", "Brennfleck", DATE("1999-02-01"), -1),
  (2, "Josie", "Curtis", DATE("1999-02-02"), -1),
  (3, "Jack", "Millar", DATE("1997-08-29"), -1),
  (4, "Kat", "Burnett", DATE("1999-02-04"), -1);

INSERT INTO Activity (activityID, parentID, activityName) VALUES
  (1, null, "Outdoor Activities"),
    (2, 1, "Survival"),
      (3, 2, "Gathering Food"),
        (4, 3, "Set Trap for Animal"),
        (5, 3, "Pick Berries"),
        (6, 3, "Gather Insects"),
     	(7, 2, "Cooking Food"),
        (8, 7, "Cook Meat"),
        (9, 7, "Prepare Berries"),
        (10, 7, "Prepare Insects"),
    (11, 1, "Protection"),
	    (12, 11, "Shelter Making"),
        (13, 12, "Gather Sticks"),
        (14, 12, "Gather leaves"),
        (15, 12, "Put Materials Together"),
     	(16, 11, "Campfires"),
		  (17, 11, "Gather Sticks"),
		  (18, 11, "Use flint"),
    (19, 1, "Fishing"),
	    (20, 19, "Catch Fish"),
		    (21, 20, "Lures"),
     	 	(22, 20, "Rods"),
     	(23, 19, "Techniques"),
		    (24, 23, "Casting"),
		    (25, 23, "Reeling in"),
    (26, 1, "Shooting"),
	    (27, 26, "Safety"),
        (28, 27, "Eye protection"),
        (29, 27, "Clearing Weapon Drills"),
        (30, 27, "Cleaning Weapon"),
      (31, 26, "Weapon Parts"),
        (32, 31, "Body"),
        (33, 31, "Working Parts"),
        (34, 31, "Trigger Mechanism"),
      (35, 26, "Marksmanship"),
		(36, 35, "Breathing"),
		(37, 35, "Aim"),
		(38, 35, "Trigger Manipulation"),
     (39, 1, "First aid"),
	 (40, 39, "Basic"),
		(41, 40, "Splintering"),
		(42, 40, "Sprains"),
		(43, 40, "Frost Bite"),
	(44, 39, "Life Threatening"),
		(45, 44, "CPR"),
		(46, 44, "Hypothermia"),
		(47, 44, "Excessive Bleeding"),
    (48, 1, "Bush Walking"),
	(49, 48, "Hike"),
		(50, 49, "Map Reading"),
		(51, 49, "Compass Reading"),
    (52, 1, "Packing"),
	 (53, 52, "Equipment"),
		(54, 53, "Cooking Equipment"),
		(55, 53, "Fire Starting Equipment"),
		(56, 53, "Correct Format of Pack"),
     (57, 1, "Environment"),
	(58, 57, "Plant Conservation"),
		(59, 58, "Plant Trees"),
		(60, 59, "Clean up Australia Day"),
		(61, 59, "Earth Day"),
	(62, 57, "Animal Conservation"),
		(63, 62, "Build a habitat"),
		(64, 62, "Research and Endangered Species"),
     (65, 1, "Physical Activity"),
	(66, 65, "Canoeing"),
		(67, 66, "Techniques"),
		(68, 66, "Types of Boats"),
		(69, 66, "History"),
	(70, 1, "Horseback Riding"),
		(71, 70, "Techniques"),
		(72, 70, "Grooming"),
		(73, 70, "Types of Horses"),
     (74, 1, "Sport"),
	(75, 74, "History"),
		(76, 75, "The Beginning of the Sport"),
		(77, 75, "Changes to the Sport"),
		(78, 75, "Significant Events"),
	(79, 74, "Rules"),
		(80, 79, "Report on the Rules"),
		(81, 79, "Changes to the Rules"),
     (82, 1, "Overnight Initiative"),
		(83, 82, "Water Challenge"),
			(84, 83, "Canoeing"),
			(85, 83, "Diving"),
		(86, 82, "First Aid Challenge"),
			(87, 86, "CPR"),
			(88, 86, "Major Bleeding"),
		(89, 82, "Navigation Challenge"),
			(90, 89, "Unmarked Trial"),
     (91, 1, "Sailing"),
		(92, 91, "Techniques"),
			(93, 92, "Knot Tying"),
			(94, 92, "Sailing Techniques"),
			(95, 92, "Rescue"),
		(96, 91, "Boats"),
			(97, 96, "Types of Boats"),
			(98, 96, "History of Boats"),
  (99, 1, "Surf Life Saving"),
		(100, 99, "Theory"),
			(101, 100, "Surf Hazards"),
			(102, 100, "Surf Conditions"),
			(103, 100, "Surf Life Saving Communication Systems"),
		(104, 99, "Practical"),
			(105, 104, "Self Survival in Surf"),
			(106, 104, "Respond to a Rescue"),
			(107, 104, "Use Flotation Equipment"),
   (108, 1, "Gardening"),
		(109, 108, "Knowledge of Plants"),
			(110, 109, "Types of Plants"),
			(111, 109, "How to Plant Seeds"),
			(112, 109, "How to Maintain Plants"),
		(113, 108, "Plant Seeds"),
			(114, 113, "Prepare Garden Bed"),
			(115, 113, "Plant Seedlings"),
			(116, 113, "Tend to Plants"),

  (117, null, "History"),
       (118, 117, "Investigating Ancient History"),
		(119, 118, "Skills"),
			(120, 119, "Analyse Sources"),
	 		(121, 119, "Analyse Case Studies"),
	  	 (122, 118, "The Nature of Ancient History"),
			(123, 122, "Features of Ancient Societies"),
			(124, 122, "Historical Investigation"),
       (125, 117, "Ancient History"),
		(126, 125, "Ancient Egypt"),
			(127, 126, "Hieroglyphs"),
			(128, 126, "Pyramids"),
			(129, 126, "Age of Decline"),
		(130, 125, "Ancient Rome"),
			(131, 130, "Rulers"),
			(132, 130, "Army"),
			(133, 130, "Architecture"),
		(134, 125, "Ancient Greece"),
    			(135, 134, "Mythology"),
			(136, 134, "Philosophy"),
			(137, 134, "Science"),
       (138, 117, "Middle Ages"),
		(139, 138, "The Rise of Islam"),
			(140, 139, "Pre Islamic Arabia"),
			(141, 139, "Prophet Muhammad"),
			(142, 139, "Articles of Faith"),
	       (143, 138, "The Black Death"),
			(144, 143, "Origins"),
			(145, 143, "Treatments"),
			(146, 143, "Interesting Facts"),
        (147, 117, "The Bolsheviks"),
		(148, 147, "Political Revolution"),
			(149, 148, "Political Figures of Russia"),
			(150, 149, "Who Were the Bolsheviks"),
			(151, 149, "Political Unrest"),
		(152, 147, "Social Revolution"),
			(153, 152, "Social Hierarchy"),
			(154, 152, "Civil Unrest"),
			(155, 152, "Challenges of Social Landscape"),
	(156, 117, "Australian History"),
		(157, 156, "Indigenous Culture"),
			(158, 157, "The Dreaming"),
			(159, 157, "Indigenous Art"),
	        (160, 156, "First Settlement"),
			(161, 160, "First Fleet"),
			(162, 160, "Arthur Phillip"),
			(163, 160, "Conflict"),
        (164, 156, "Federation"),
			(165, 164, "The Constitution"),
			(166, 164, "Edmund Barton"),
        (167, 117, "World War I"),
       		(168, 167, "Triple Entente"),
			(169, 168, "The Somme"),
			(170, 168, "Passchendale"),
			(171, 168, "Verdun"),
		(172, 167, "Axis Powers"),
			(173, 172, "Spring Offensive"),
			(174, 172, "Isonzo"),
			(175, 172, "Axis Failure"),
	(176, 117, "World War II"),
		(177, 176, "Major Battles"),
			(178, 177, "Pearl Harbour"),
			(179, 177, "Battle of Britain"),
			(180, 177, "Battle of Midway"),
		(181, 176, "Political Events"),
			(182, 181, "Germany Post WWI"),
			(183, 181, "German Failures"),
			(184, 181, "Allies Success"),
        (185, 117, "Vietnam War"),
		(186, 185, "Political Landscape"),
			(187, 186, "Domino Effect"),
			(188, 186, "WHAM"),
			(189, 186, "Cold War"),
		(190, 185, "Guerilla Warfare"),
			(191, 190, "Viet Cong Techniques"),
			(192, 190, "Allied Difficulty"),
			(193, 190, "Effects"),
         (194, 117, "Art"),
	       (195, 194, "Ancient Classical Art"),
			(196, 195, "Greek Sculptures"),
			(197, 195, "Roman Sculptures"),
	       (198, 194, "Medieval Art"),
			(199, 198, "Characteristics"),
			(200, 198, "Famous Artists"),
			(201, 198, "Style"),
	       (202, 194, "Renaissance"),
			(203, 202, "Leonardo Da Vinci"),
			(204, 202, "Michelangelo"),
			(205, 202, "Donatello"),
         (206, 117, "Clothes"),
		(207, 206, "Ancient Clothing"),
			(208, 207, "Fabrics"),
			(209, 207, "Status Symbols"),
		(210, 206, "Middle Ages Clothing"),
			(211, 210, "Knights"),
			(212, 210, "Headpieces"),
		(213, 206, "Modern Era Clothing"),
			(214, 213, "17th Century Females"),
			(215, 213, "17th Century Males"),
			(216, 213, "Post 20th Century"),
         (217, 117, "Civil Rights Movement"),
		(218, 217, "American"),
			(219, 218, "Slavery"),
			(220, 218, "Segregation"),
			(221, 218, "Historical Figures"),
		(222, 217, "Australian"),
			(223, 222, "The Stolen Generation"),
			(224, 222, "Indigenous Constitutional Rights"),
			(225, 222, "Mabo Case"),
         (226, 117, "RAAF History"),
		(227, 226, "Australian Flying Corps"),
			(228, 227, "WWI Operations"),
		(229, 226, "Australian Air Force"),
			(230, 229, "Establishment"),
			(231, 229, "WWII Operations"),
		(232, 226, "Present Day"),
			(233, 232, "Current Operations"),
			(234, 232, "Fifth Generation"),
         (235, 117, "Australian Army History"),
		(236, 235, "Pre ARA"),
			(237, 236, "Militias"),
			(238, 236, "Australian Imperial Force"),
		(239, 235, "Post WWII"),
			(240, 239, "Establishment"),
			(241, 239, "Operations"),
		(242, 235, "Current ARA"),
			(243, 242, "Modern Operations"),
			(244, 242, "Values"),
         (245, 117, "Royal Australian Navy History"),
		(246, 245, "Settlement"),
			(247, 246, "Royal Navy"),
		(248, 245, "Establishment of RAN"),
			(249, 248, "Ships"),
			(250, 248, "WWI Operations");
