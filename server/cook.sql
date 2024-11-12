-- -----------------------------------------------------
-- Schema cook
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `cook`;
USE `cook`;

-- -----------------------------------------------------
-- Table `cook`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cook`.`user` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255),
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email` (`email`)
);

-- -----------------------------------------------------
-- Table `cook`.`googleUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cook`.`googleUser` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `picture` VARCHAR(255),
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `email` (`email`)
);

-- -----------------------------------------------------
-- Table `cook`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cook`.`session` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) UNSIGNED NOT NULL,
    `valid` BOOLEAN DEFAULT TRUE,
    `user_agent` VARCHAR(255),
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `googleUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `cook`.`recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cook`.`recipes` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `tittle_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image_url` VARCHAR(255),
    `ingredients` JSON NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

-- -----------------------------------------------------
-- Table `cook`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cook`.`comments` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) UNSIGNED NOT NULL,
    `recipe_id` INT(11) UNSIGNED NOT NULL,
    `content` TEXT NOT NULL,
    `rating` INT CHECK (rating >= 1 AND rating <= 5),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Insert `cook`.`recipes`
-- -----------------------------------------------------
INSERT INTO recipes (tittle_id, title, description, image_url, ingredients)
VALUES
    ('croques-monsieur-au-four-de-ma-grand-mere',
        'Croques-monsieur au four de ma grand-mère',
        "Un classique facile et rapide à réaliser, qui fait plaisir à toute la famille et régalera vos amis ? On a la recette idéale pour vous : le croque-monsieur au four façon \"grand-mère\". Du pain, du jambon, du gruyère, un soupçon de crème fraîche et de lait, un œuf... on est sûr que vous avez déjà tout ça dans vos placards !",
        'https://img.cuisineaz.com/660x495/2016/09/03/i94824-croques-monsieur-au-four-de-ma-grand-mere.jpg',
        '["4 slices bread", "2 slices ham", "0.5 egg", "gruyère cheese", "1 tablespoon milk", "0.5 tablespoon crème fraîche", "salt", "pepper"]'),
    ('soupe-au-potimarron-facile',
        'Soupe au potimarron facile',
        "La soupe au potimarron facile, c'est un grand bol de douceur pour un tendre instant de réconfort ! Prête en un rien de temps, cette recette de saison met de la chaleur dans nos soirées d'automne. Légère mais ultra-gourmande, elle mise sur une farandole d'herbes, avec du romarin, de la sarriette et du persil, pour rehausser la délicate saveur de la courge. Couronnez-la d'un topping croustillant composé de croûtons de pain et de graines de courge, cette soupe rapide ensoleillera les repas jusqu'au début de l'hiver !",
        'https://img.cuisineaz.com/660x495/2021/09/21/i180674-soupe-potimarron-facile.jpeg',
        '["0.5 red kuri squash", "0.5 onion", "0.5 bouquet rosemary", "0.5 bouquet savory", "22.5 cl chicken broth", "0.5 tablespoon olive oil", "5 g pumpkin seeds", "2.5 sprigs parsley", "0.5 handful croutons"]'),
    ('moussaka-facile',
        'Moussaka facile',
        "Servie traditionnellement dans les Balkans et au Moyen-Orient, la moussaka est une préparation gratinée à base d'aubergines, d'oignons et de tomates liés avec une sauce blanche. Dans sa version grecque, elle compte également de la viande hachée de mouton, souvent remplacée en Europe par de la viande de bœuf ou d'agneau. Plongez vite la cuillère dans ce plat empreint de générosité et d'authenticité, qui se déguste aussi bien chaud que froid !",
        'https://img.cuisineaz.com/660x495/2013/12/20/i5178-moussaka.jpg',
        '["62.5 g ground beef", "1 eggplants", "1 tomatoes", "0.5 onion", "0.5 clove garlic", "12.5 g grated cheese", "2.5 sprigs chives", "1 tablespoon olive oil", "62.5 ml water", "1.5 knobs of butter", "1 pinch salt", "1 pinch pepper", "0.3 l milk", "10 g butter", "0.5 tablespoon flour","1 pinch nutmeg"]'),
    ('gratin-de-chou-fleur',
        'Gratin de chou-fleur',
        "Vous pensez qu'il est impossible de faire manger des choux aux enfants ? Détrompez-vous ! Avec son onctueuse sauce béchamel au gruyère râpé et son irrésistible couche gratinée, ce gratin de chou-fleur va définitivement réconcilier vos petits chenapans avec les crucifères. Réconfortant et très gourmand, il trouvera sa place dans vos menus hivernaux en garniture d'une viande blanche ou d'un rôti de bœuf, mais aussi en solo assorti d'une salade verte croquante.",
        'https://img.cuisineaz.com/660x495/2013/12/20/i45705-photo-de-gratin-de-chou-fleur.jpeg',
        '["0.3 kg cauliflower", "3.3 g butter", "1.5 sprigs chives", "1 pinch salt", "8.3 g butter", "8.3 g flour", "12.5 ml milk", "11.8 g grated Gruyère cheese", "1 pinch nutmeg", "1 pinch salt", "1 pinch pepper"]'),
    ('couscous-royal',
        'Couscous royal',
        "Plat signature de la cuisine orientale, le couscous remonterait au IIIe siècle avant notre ère ! Si sa garniture varie selon les coutumes locales, sa base demeure invariable : de la semoule de blé, et un ragoût de légumes aux épices cuisiné théoriquement avec une seule variété de viande. C'est pourtant le couscous royal (unissant merguez, agneau et poulet) qui a conquis nos assiettes occidentales ! Voyagez au Maghreb le temps d'un repas avec cette recette pleine de saveurs.",
        'https://img.cuisineaz.com/660x495/2016/04/28/i15329-couscous-royal.jpg',
        ' ["0.3 kg medium couscous", "0.3 kg boneless lamb shoulder", "1 chicken", "2 merguez sausages", "0.5 cups chickpeas", "0.5 zucchinis", "0.5 carrots", "0.5 turnips", "0.5 eggplants", "0.5 ripe tomatoes", "0.5 onion", "25 g raisins", "0.5 tablespoon clarified butter", "0.5 tablespoon tomato paste", "0.5 teaspoons ras el-hanout", "1 teaspoon paprika", "1 sprig flat parsley", "1 pinch harissa", "1 glass olive oil", "1 pinch salt", "1 pinch pepper"]'),
    ('puree-de-pommes-de-terre-maison',
        'Purée de pommes de terre maison',
        "Une bonne purée de pommes de terre maison, c'est un aller simple vers l'enfance, une promesse de réconfort, et une bonne plâtrée de douceur et de générosité à partager. Si chaque famille a sa recette, voici la nôtre, basique et savoureuse ! Quelques ingrédients tout simples suffisent à la réaliser, à vous de jouer !",
        'https://img.cuisineaz.com/660x495/2013/12/20/i37576-puree-de-pommes-de-terre-maison.jpeg',
        '["250 g potatoes", "0.5 clove garlic", "50 ml milk", "0.5 tablespoon crème fraîche", "5 g butter", "salt", "pepper"]');
