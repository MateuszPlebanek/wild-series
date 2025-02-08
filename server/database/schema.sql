create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);

  create table category (
    id int unsigned primary key auto_increment not null,
    name varchar(100) not null unique
  );

  create table program (
    id int unsigned primary key auto_increment not null,
    title varchar(255) not null,
    synopsis text not null,
    poster varchar(255),
    country varchar(100),
    year int,
    category_id int unsigned not null,
    foreign key(category_id) references category(id)
  );

insert into category (id, name)
values
  (1, "Comédie"),
  (2, "Science-Fiction");

  insert into program (id, title, synopsis, poster, country, year, category_id)
  values
    (1, "The Good Place",
   "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit...",
   "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/...",
   "USA", 2016, 1),
  (2, "Dark",
   "Quatre familles affolées par la disparition d'un enfant...",
   "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/...",
   "Allemagne", 2017, 2);