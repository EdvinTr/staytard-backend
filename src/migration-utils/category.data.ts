import { ProductCategory } from '../modules/product-category/entities/product-category.entity';

type BasicProductCategory = Pick<
  ProductCategory,
  'name' | 'slug' | 'path' | 'description'
> & { children?: BasicProductCategory[] };

const jacketsCategories: BasicProductCategory = {
  name: 'Jackets',
  slug: '/jackets',
  path: '/clothes/jackets',
  description:
    'A jacket is an important investment that can represent your style for several seasons. The right jacket is a basic prerequisite for your particular style and attire to be highlighted. Here at Staytard you will find a wide range of affordable quality jackets. As a rule, you should invest in at least one more dressed-up jacket, such as a parka, which can suit both work and leisure. Our range of coats and trench coats has several different lengths and cuts, from straight wool coats to shorter variants with double buttoning. Combine with an oversized scarf for a nice rounding. Or use dressing in a hoodie and sneakers for a more casual feeling. It may also be worth investing in another jacket that can be used for more casual occasions. The denim jacket is the classic spring and summer jacket that fits almost everything. A fashion favorite is also the versatile bomber jacket that comes in a variety of materials and thicknesses. This short jacket variant works perfectly with a pair of skinny denim trousers and a pair of cloth shoes.',
  children: [
    {
      name: 'Bomber & baseball jackets',
      slug: '/jackets/bomber-baseball-jackets',
      path: '/clothes/jackets/bomber-baseball-jackets',
      description:
        'Bomber jackets and baseball jackets are tough jackets that are often of a shorter model and are available in many different colors and designs. The sporty look of the jacket is easy to match with most things and fits both jeans and chinos. A baseball or bomber jacket is perfect for the chilly summer evening but also works well during autumn and spring. At Staytard you will find really nice baseball and bomber jackets.',
    },
    {
      name: 'Jeans jackets',
      slug: '/jackets/jeans-jackets',
      path: '/clothes/jackets/jeans-jackets',
      description:
        "Men's denim jacket is a garment that is used in many different styles. If you want a jacket that breathes rock'n'roll, you should choose a shorter box model in dark or black denim. If you get your style from street style and skate culture, an oversized denim jacket in a light, worn wash is just the right choice. Wear your oversized jacket with your favorite hoodie and you will have found a comfortable and cool style. Matching jeans and jeans is also a super trend. If you want to go all in, choose a jacket and jeans in the same wash. Dark blue denim gives a dressy feeling while driving all black is suitable in all contexts. Choosing a pair of black jeans and a denim jacket in light laundry is also just right for many occasions. With us, you will find several different models and washes to choose from, which makes it easy to find one that suits your style.",
    },
    {
      name: 'Overshirt',
      slug: '/jackets/overshirt',
      path: '/clothes/jackets/overshirt',
      description:
        "The overshirt is a modern fashion item that has found its way into almost every man's wardrobe. As a cross between a shirt and a lighter jacket, the overshirt works indoors as well as outdoors and as a functional layer-on-layer garment. Durable in quality means that it lasts longer and you can wear less on nature.",
    },
    {
      name: 'Parka',
      slug: '/jackets/parka',
      path: '/clothes/jackets/parka',
      description:
        "With inspiration from hunting and fishing clothes in Greenland, the modern parka jacket came to life. A parka is generally a longer jacket, especially at the back, and received a fashion boost in the 60's after being used as a military garment. Extra comfortable during the winter and just as fashionable as today.",
    },
    {
      name: 'Pile',
      slug: '/jackets/pile',
      path: '/clothes/jackets/pile',
      description: '',
    },
    {
      name: 'Puffers',
      slug: '/jackets/puffers',
      path: '/clothes/jackets/puffers',
      description:
        'For a barren and northern climate, warm clothes are required to trust. A down jacket or a padded jacket can be your salvation on those extra chilly days. But at the same time as you have to keep warm, you have to keep the style, so of course we recommend matching with your other outfit',
    },
    {
      name: 'Rain & function jackets',
      slug: '/jackets/rain-function-jackets',
      path: '/clothes/jackets/rain-function-jackets',
      description:
        'Cold winds, rain and other nuisances are things that can not be avoided in Sweden. Then it is important that you wear good clothes and among the most important is a functional jacket that withstands the worst moisture and cold. Staytard has lots of functional jackets to choose from. You should not have to choose between function and style, here you can find nice function jackets that also create trend. When you get your new functional jacket from us, in addition to a good price, you can also count on a fast and free delivery.',
    },
    {
      name: 'Rocks & trench coats',
      slug: '/jackets/rocks-trench-coats',
      path: '/clothes/jackets/rocks-trench-coats',
      description:
        "When choosing a rock, you should start with your own style and then think practically. The coat you choose should keep warm and be fairly functional even in bad weather. A coat in coarser wool material gives both warmth and a well-dressed and casual impression. Choosing black, navy blue or brown makes it easy to match the rest of your clothes. You can also choose to wear the trench coat open or closed depending on the weather and what you are wearing. Vary by either wearing the collar raised or lowered. The jacket's classic color is beige, but you can also find dark red and navy blue and of course black. Both the coat and the trench coat are easily complemented with a scarf, hat and gloves where you can choose freely from colors to the jackets' more neutral shades.",
    },
    {
      name: 'Leather & suede jackets',
      slug: '/jackets/leather-suede-jackets',
      path: '/clothes/jackets/leather-suede-jackets',
      description:
        'Choose a jacket that suits your style. One tip is the pilot model, which is always a safe bet. With details such as rivets and oblique zippers, you collect extra style points. The classic leather jacket is the motorcycle jacket. You can match and wear this jacket in so many different ways, which makes it a favorite with many. Wear it with a simple T-shirt and skinny jeans or with a figure-hugging shirt. The traditional short leather jacket is a perfect alternative all year round. Wear it with a pair of light chinos in the summer, or with a pair of black jeans and a hoodie for a more rocking look during the colder months. If you want a leather jacket for more well-dressed occasions, you should choose a jacket model. The leather jacket gives the perfect feeling of balance between the cocky and luxurious.',
    },
    {
      name: 'Winter jackets',
      slug: '/jackets/winter-jackets',
      path: '/clothes/jackets/winter-jackets',
      description:
        'As you know, summer is short, and the months when you have to wear a jacket are many. The choice of autumn jacket and winter jacket is therefore an important one, so make sure you spend some time and energy finding the jackets that suit you and your style. A bomber jacket is the perfect autumn jacket, and a stylish down jacket is warm and comfortable in winter. Find your favorites at Staytard, always at good prices.',
    },
    {
      name: 'Vests',
      slug: '/jackets/vests',
      path: '/clothes/jackets/vests',
      description:
        "Vests are available in many different designs and in our range you can find a stylish vest for all occasions, whether you are looking for one for colder days, a vest for outdoor training or an elegant model for the party. The vest is perfect when it gets colder outside, but not cold enough to bring out the winter jacket. But a thinner model also works well in the spring, summer evenings and early autumn. A vest can give an extra cool and at the same time elegant touch to your outfit. The garment has been around for several years and fashion turns and regardless of style, there is a vest that suits you. Do you choose a long, short, tight or loose fit? Regardless, you can polish both your party and everyday outfit with a stylish men's vest.",
    },
    {
      name: 'Spring & autumn jackets',
      slug: '/jackets/spring-autumn-jackets',
      path: '/clothes/jackets/spring-autumn-jackets',
      description:
        "In the spring, it's time to hang the winter jacket in the closet and put on something a little lighter. Staytard has lots of stylish spring jackets, autumn jackets and summer jackets to choose from. A stylish jacket is an invaluable part of your outfit, and here you will find several men's spring and autumn jackets that fit many different styles. Find your new autumn and spring jacket for the year at Staytard and get fast and free delivery, with free returns.",
    },
  ],
};

const sweatersCategories: BasicProductCategory = {
  name: 'Sweaters',
  description:
    "Sweaters say a lot about a man's style as it is a garment that has the potential to both capture attention and give the wearer a neutral style. Some shirts are used to spread messages with prints and texts, others are solid color and without any major details. Your style and taste determine what is right for you, but a rule of thumb is that the more stylish the model is, the easier it is to match. Solid-colored sweaters in simple cuts are therefore also best suited for work and for more formal occasions, even if they also work at home. In your free time and at the gym, you just have to go all out with colors and prints - here you set the limits yourself. For spring and summer, cool, light sweaters are needed that keep you warm on cold evenings. For winter and autumn, you should invest in warm, knitted models - preferably with a slightly looser fit so that you can hold a few layers underneath.",
  path: '/clothes/sweaters',
  slug: '/sweaters',
  children: [
    {
      name: 'Hoodies & zip shirts',
      description:
        "Hoodie, or monk jacket as it is also called, is a very popular men's sweater. The comfortable hood at the back, with the laces to adjust the size of the hat and the pockets that are often in the front, makes it both a comfortable and practical garment - especially when you need extra warmth. The hoodie has a longer tradition in men's fashion than you might think - it has its origins in the Middle Ages, when the monks wore a hood on their heads. Today, many popular fashion icons have embraced the hoodie and designed different variants of it. If you are looking for your own hoodie, you will find several different models and variants with us at Staytard.",
      path: '/clothes/sweaters/hoodies-zip-shirts',
      slug: '/sweaters/hoodies-zip-shirts',
    },
    {
      name: 'Sweatshirts',
      description:
        'Are you looking for a long-sleeved sweater men, or a sweatshirt as it is also called? Here at Staytard you will find an impressive range of different styles, materials and colors. If you want to keep the style even when you relax at home or look respectable at the job interview at the start-up company, we have what you are looking for in our range. With a sweatshirt, you can create a casual style for a day at work and if you match a solid-colored sweatshirt with a pair of suit trousers, you have an outfit worthy of a finer dinner. It is also the perfect garment to wear during training or just to and from the gym. The combinations are endless with this garment, make sure you have at least one sweatshirt in the closet.',
      path: '/clothes/sweaters/sweatshirts',
      slug: '/sweaters/sweatshirts',
    },
    {
      name: 'Long-sleeved T-shirts & grandfather shirts',
      description:
        "Who can say no to a comfortable, rib-knit grandfather sweater in a model with a perfect fit? The sweater that has been a great classic in men's fashion for many years is easily matched with a pair of stylish jeans or a stylish jacket. It can be difficult to find the perfect grandfather sweater, with that we can have the solution. Thanks to our large selection, you can easily choose between different models, colors and structures. Let yourself be inspired by our different sweaters that you can use on different occasions. Here is something for everyone. Imagine a snowy afternoon, the fire is lit and you sit and read a book in a nice grandfather sweater and a pair of nice pants. Or why not at the job lunch with colleagues, when you have taken the grandfather's sweater under a nice jacket - the areas of use are many.",
      path: '/clothes/sweaters/long-sleeved-t-shirts-grandfather-shirts',
      slug: '/sweaters/long-sleeved-t-shirts-grandfather-shirts',
    },
    {
      name: 'Polo shirts',
      description:
        "The polo shirt is the best garment of autumn and winter that makes you look both handsome and smart. Best of all, it warms. The polo shirt works fantastically well for a pair of jeans and sneakers, but at least as well for a pair of suit trousers and fine shoes. This is something we at Staytard like extra much with the polo shirt, it is easy to combine with most things in your wardrobe and thanks to the warm collar, men's polos are great to use on colder days when the wind is blowing. With the fantastic range available when it comes to polo shirts for men, it is easier than ever to find the polo shirt that is right for you",
      path: '/clothes/sweaters/polo-shirts',
      slug: '/sweaters/polo-shirts',
    },
    {
      name: 'Knitted sweaters',
      description:
        "Are you looking for a knitted men's sweater with a figure-hugging fit or a looser variant to combine with a pair of tight jeans, for example, you will find it here. Solid-colored, patterned, with a higher polo collar, wide rounded neck, close to the figure or a looser variant - we have all types of models you can think of. You can wear a knitted sweater in any context for an impeccable look. A finely knitted sweater with a polo collar under a jacket can make you the hottest at parties in autumn and winter. Best of all, a knitted sweater is also one of the most comfortable garments you can wear on the body - being able to be both stylish and comfortable has never been easier.",
      path: '/clothes/sweaters/knitted-sweaters',
      slug: '/sweaters/knitted-sweaters',
    },
    {
      name: 'Cardigans',
      description:
        "You can advantageously wear a cardigan over a shirt at a slightly finer event or everyday over a favorite T-shirt. It is a versatile garment that you can combine in several different ways to match today's events. Thanks to the cardigan being open and often buttoned with buttons or a zipper, you can leave it unbuttoned to show off the clothes you have underneath or button it all the way up to the neck for a more proper look. A cardigan usually comes in a long and straight model and sometimes with accompanying pockets. The men's cardigan has become more and more popular and you see it today on everything from football professionals to home fathers. Follow the fashion and make sure you have at least one in your closet. You will find a wide range of men's cardigans and cardigans with us at Staytard",
      path: '/clothes/sweaters/cardigans',
      slug: '/sweaters/cardigans',
    },
    {
      name: 'Functional shirts',
      description: '',
      path: '/clothes/sweaters/functional-shirts',
      slug: '/sweaters/functional-shirts',
    },
  ],
};

const jeansCategories: BasicProductCategory = {
  name: 'Jeans',
  description:
    'Fit and the right fit are crucial when you want to find the optimal pair of jeans. Jeans are a fabric that gives and gets a perfect fit the more they are used. Therefore, choose a pair that is comfortable, but slightly tight when you buy new - jeans have an ability to shape themselves to your body. Also, remember to wash your jeans as infrequently as possible to get the right feel and wear. Ventilate rather than wash! Jeans never go out of style, but which model is the trendiest varies between seasons. Which color you choose also matters, but since you can never fill the wardrobe with enough denim, we strike a blow to buy a pair of jeans in all colors. Regardless of whether you choose a navy, black or light blue model, you will be exactly right. A pair of dark blue or black jeans gives a dressy impression while a pair of light blue or white is perfect for the summer season. No matter what is the trendiest, you should also start from your body type when choosing a jeans model.',
  path: '/clothes/jeans',
  slug: '/jeans',
  children: [
    {
      name: 'Regular fit jeans',
      description:
        "A pair of high-quality regular fit jeans is not just a must in every man's wardrobe - it's a necessary investment. Think of all the times they can come in handy. At work, a pair of regular fit jeans fits perfectly with a light blue shirt and a darker jacket. It gives a professional impression, while not signaling the strictness of the suit. When you then go out to eat with the polar bears, the same jeans fit perfectly with a polo shirt or regular T-shirt. It is simply a stylish alternative that suits most occasions and combinations. A rule of thumb is that darker jeans in simple style are generally preferable in more formal contexts. The lighter and the more wear, the more informal. But you can of course experiment as you like with the standards to find your unique style.",
      path: '/clothes/jeans/regular-fit-jeans',
      slug: '/jeans/regular-fit-jeans',
    },
    {
      name: 'Skinny fit jeans',
      description:
        'The classic jeans are available in as many varieties as grains of sand in the desert. In almost every case, the beloved garment comes in countless models and colors without ever becoming outdated. Puffy or tight - a pair of stylish, comfortable jeans is your best friend and a safe bet in most contexts. The tight trousers often have stretchy and durable material so that you can move freely between work, school and activities with the style on top. We at Staytard think it should be easy to fix a stylish and stylish outfit and therefore offer a large selection of jeans with narrow legs. You get a straight and elegant finish at the bottom with the jeans, which fits perfectly with many of your favorite shoes',
      path: '/clothes/jeans/skinny-fit-jeans',
      slug: '/jeans/skinny-fit-jeans',
    },
    {
      name: 'Slim fit jeans',
      description:
        'No matter how you dress everyday, a pair of slim fit jeans will fit in the wardrobe. They give a slightly narrower look and are easy to vary with different shoes, sweaters and jackets. Its downpipe-like character makes them look great with a tight T-shirt or hoodie. The variants are available in everything from light and dark colors to the classic blue color and come with different wears. If you have no major ambitions to stand out, a pair of jeans in blue, black or green works great. If you want to create a unique and distinctive style instead, there are larger pockets, stylish chains and solid wear to combine with the trousers. Create your own, unique style with a pair of really nice jeans bras.',
      path: '/clothes/jeans/slim-fit-jeans',
      slug: '/jeans/slim-fit-jeans',
    },
    {
      name: 'Loose fit jeans',
      description:
        'Wearing loose fit jeans can feel daring but it does not have to be so dramatic. Today, it is common for men to run a slightly more preppy style for this type of jeans. A button-down shirt, a pair of sunglasses and a pair of leather shoes give an everyday yet stylish look that catches the attention. If you want to avoid 90s vibes, make sure you wear tighter clothes on the upper body, but it is more a matter of taste than a rule. With a large selection of loose fit jeans, doors open for you to find and create your own style. If you have a pair of shoes that you are happy to show off, you can advantageously choose a shorter pair of jeans and your shoes will get as much attention as your new bras. Play with the details and possibilities to create the ultimate impression.',
      path: '/clothes/jeans/loose-fit-jeans',
      slug: '/jeans/loose-fit-jeans',
    },
  ],
};
const pantsCategories: BasicProductCategory = {
  name: 'Pants',
  description:
    "When you have found trousers that fit like a glove, a hot tip is to buy several pairs of the same - preferably in different colors. Then you always have a good base to build the rest of your outfit on. In our range of men's trousers, we offer you both the latest models but also classics that you recognize. Develop and challenge your style but above all, make sure you have a good and comfortable fit on your new pants. The chinos trousers are a very popular trousers thanks to their comfort at the same time as they are stylish and suitable for everyday as well as at work and for parties. A new model that has become a hit is a mix of chinos with sweatpants, so-called joggers. They are more modernly sporty but at the same time as useful as a pair of chinos. Take a deep dive down among our pants online with chinos, jeans, cargo pants and bras in linen or leather.",
  path: '/clothes/pants',
  slug: '/pants',
  children: [
    {
      name: 'Cargo pants',
      description:
        'How to get a pair of cargos to sit nicely? Maybe you should not choose the largest of the sizes so you look like a holiday camper in Ullared. A pair of nicely fitted cargos can enhance your style, but do not just fill your pockets with a lot of rubbish, but keep it clean and match it with a hoodie or a nice sweater and preferably a pair of light sneakers.',
      path: '/clothes/pants/cargo-pants',
      slug: '/pants/cargo-pants',
    },
    {
      name: 'Chinos',
      description:
        'Can not keep your wardrobe up to date? Then bet on chinos. Chinos men is an easy and timeless choice for all situations, from the customer presentation to the nightclub. By investing in several different colors, you have soon fixed a clothing set for all occasions. Choose from a variety of colors and styles in our wide range from brands such as Mouli and Velor by Nostalgi. Create a casual everyday look with a T-shirt and cardigan or a sporty hoodie. Give your style a laid-back impression with rolled-up legs and a stylish leather boot or choose a trendy model that allows you to emphasize your canvas shoes. For a dressy look, choose to match with a tucked-in shirt, loafers and a belt. Sharpen your profile further by putting on a jacket for work. Our affordable chinos offer you a wealth of opportunities.',
      path: '/clothes/pants/chinos',
      slug: '/pants/chinos',
    },
    {
      name: 'Soft pants',
      description:
        "Cozy pants, training pants, jogging pants, soft pants. Dear child has many names. Sweatpants have long been considered a home garment. And of course it's still nice to pull on the cozy pants and slippers after work, but in the right combination of colors and shoes, jogging pants are just as good as the basis for a relaxed style outside the home. Feel comfortable and free from stress in some of our stylish soft pants men. For a nice Sunday outfit, try combining with a white T-shirt and a nice cardigan. A solid-colored T-shirt in a strong color scale gives a tough edge to gray-mottled or dark blue cozy trousers, and if you roll up the trouser leg, you get a nice, relaxed summer feeling. Modern sweatpants are extra stylish with a trendy tapered trouser leg that highlights your shoe choice. Choose comfort and invest in a pair of stylish jogging pants for men today.",
      path: '/clothes/pants/soft-pants',
      slug: '/pants/soft-pants',
    },
    {
      name: 'Rain & function pants',
      description:
        'Jeans in all glory, but they do not really suit all weathers. When it rains outside, you need something else and that is exactly what we offer here - functional trousers. Or maybe you should go out into nature, or work outdoors. Regardless, it is a nice functional trousers you should wear to look as good as possible. Pull the functional trousers over your regular trousers, and you stay both dry and warm.',
      path: '/clothes/pants/rain-and-function-pants',
      slug: '/pants/rain-and-function-pants',
    },
  ],
};

const shirtsCategories: BasicProductCategory = {
  name: 'Shirts',
  description:
    "A men's shirt is a given garment for finer occasions around the world. Depending on the season, we can see new, beautiful patterns and colors appearing all the time. For the summer, more colorful alternatives are often offered in pastel shades, preferably with tropical patterns such as palm trees, flamingos or flowers. A classic is also a men's linen shirt that is both airy and comfortable. For the colder months, duller colors such as burgundy, moss green and camouflage patterns appear. A men's flannel shirt is also something that is seen more often during the winter. This is what makes it so fun to dress in stylish men's shirts, that they are easy to vary according to the season and adapt to your own style. Nowadays, it is not as common for workplaces to require a shirt at work, but many people like to wear it anyway. Today the shirts are made in beautiful, soft materials and comfortable fits. This means that they are easily worn for an entire day.",
  path: '/clothes/shirts',
  slug: '/shirts',
  children: [
    {
      name: 'Solid-colored shirts',
      description:
        'We have shirts in different fits and materials to suit your personality. Choose a model with buttons all the way down for a stylish and classic impression, or a shirt with buttons down to the chest for a more relaxed and cool feeling. The shirt is just as nice to match with chinos, shorts or jeans and works well as a top on its own or together with a jacket for a really dressed up look. If you feel that the shirt feels too tight for you, you can try wearing it over a T-shirt and holding it unbuttoned. Roll up your sleeves, use with a pair of sneakers or thicker boots and you are home. You can simply get the solid color shirt just the way you want it. Dressed up preppy or casually cool - the possibilities are great.',
      path: '/clothes/shirts/solid-colored-shirts',
      slug: '/shirts/solid-colored-shirts',
    },
    {
      name: 'Jeans shirts',
      description:
        'You can not only wear jeans at the bottom, a cheeky denim shirt should be worn by most men in the wardrobe. This iconic garment will always be able to be mixed and matched and has an equally given place in the office as on an AW. Thanks to the fact that we at Staytard have a large selection of denim shirts for men, you can pick and choose to find one that suits your style and attitude will not be a problem. For a classic that will never run out of time, opt for a dark or light blue denim shirt with a traditional collar. If you want to challenge a little, we would recommend a black denim shirt for men equipped with chest pockets and press studs. Invest in a shirt that suits your taste and raise the level of your wardrobe a notch further.',
      path: '/clothes/shirts/jeans-shirts',
      slug: '/shirts/jeans-shirts',
    },
    {
      name: 'Short-sleeved shirts',
      description:
        "At Staytard, we take fashion very seriously. An outfit that you feel proud to wear can light up all day and if you feel confident in the garments you wear, they will only look even better on you. Comfort is at least as important and to get a style that you are comfortable in, the garments must fit comfortably. It does not get much better than an airy and casual short-sleeved shirt for men during a balmy spring or summer day. We offer several different types of short-sleeved shirts in the highest quality and in several different variants. Whatever the occasion, you can look well-dressed and handsome. Get a nice and relaxed look with a short-sleeved men's shirt from our range.",
      path: '/clothes/shirts/short-sleeved-shirts',
      slug: '/shirts/short-sleeved-shirts',
    },
    {
      name: 'Patterned shirts',
      description:
        'If you want to make a big splash and find the patterned shirts men who make your outfit, we have several different variants in the range. They will at least capture the attention of both you and others. Fashion should be fun and daring, go outside your comfort zone and strike at a fun design! Let the patterned shirt stand for the talk and let the rest of your outfit go in muted or neutral colors. If you are more hungry for a discreet floral shirt, you will also find several variations of these here at Staytard. Be the center of the party or liven up everyday life with one of our patterned shirts. We offer stylish brands such as Knowledge Cotton Apparel, SAND, Savvy Citizen and Castor Pollux.',
      path: '/clothes/shirts/patterned-shirts',
      slug: '/shirts/patterned-shirts',
    },
    {
      name: 'Dressed shirts',
      description:
        "Costume shirts are a staple in the men's wardrobe. The most common is most likely one in white, but even blue variants in lighter shades are often included. Make sure you look elegant during those solemn occasions and evenings that you will soon forget and leave a stylish impression.",
      path: '/clothes/shirts/dressed-shirts',
      slug: '/shirts/dressed-shirts',
    },
  ],
};

const tShirtsCategories: BasicProductCategory = {
  name: 'T-shirts',
  description:
    "Not only is a men's T-shirt stylish in its simplicity, it can come with both patterns, prints, different cuts and with attributes such as a polo collar or different curves in the neck. In the range at Staytard, you can scroll through several different models of stylish T-shirts. Finding something that suits your taste among all the varieties we offer will not be difficult. If you like to be seen, there are prints and patterns that can be seen from miles away. If you want to get a nice look on the date, we would suggest a T-shirt with a cool print and if it is a meeting in a work context, a solid color T-shirt is an excellent choice. T-shirt is the garment that looks as good under a jacket as under a jacket. It works just as well with worn jeans, suit trousers and shorts - you can not go wrong when you have a T-shirt with a nice fit. Get a T-shirt men will envy you for or pick on you a whole bunch of our cheap T-shirts. This is the garment that works in all situations and for all occasions - there is no such thing as too many when it comes to T-shirts",
  path: '/clothes/t-shirts',
  slug: '/t-shirts',
  children: [
    {
      name: 'Solid color T-shirts',
      description:
        'How does this sound; a pair of worn jeans, your favorite boots and then a black T-shirt with a slightly wider cut at the neck? Or a pair of dark jeans with a perfect fit, a white slightly looser T-shirt and a black jacket? In both cases, the T-shirt really only plays a supporting role, but it is the combination that makes the outfit. With a single-colored T-shirt, it is difficult to make a mistake as in many cases it is the key garment that ties together an entire outfit. As obvious as this garment is on a hot summer day, it is as a base under a hoodie or sweatshirt, or as part of a layer on layer look when the temperature has crept down. If you want to be properly dressed at all times, take a look at the range we offer and pick up a basic wardrobe of solid-colored T-shirts.',
      path: '/clothes/t-shirts/solid-colored-t-shirts',
      slug: '/t-shirts/solid-colored-t-shirts',
    },
  ],
};

const shortsCategories: BasicProductCategory = {
  name: 'Shorts',
  description:
    "For a complete basic wardrobe, you can opt for shorts for men in the colors black, white or khaki. They will fit nicely with the rest of your wardrobe and therefore make them incredibly useful. However, do not forget that a pair of men's shorts in strong colors will give you the opportunity to create really nice, eye-catching looks. And a pair of denim shorts is hard to live without. Even though the shorts have taken to the streets, we still use them more than happy when we train. A pair of men's long shorts gives us that sporty, but at the same time relaxed, look and is at the same time easy to move in. A pair of men's cargo shorts is also a favorite that fits well with the T-shirt or hoodie. Find your shorts online with us today!",
  path: '/clothes/shorts',
  slug: '/shorts',
  children: [
    {
      name: 'Swim shorts',
      description:
        'Since the swimming shorts come in so many and also stylish looks today, they fit just as well off the beach. Match them with, for example, a loose-fitting linen shirt and a pair of stylish sneakers for a suitably dressed style. Swim shorts not only come in different looks in terms of colors and patterns, but can also be found in different fits. Some prefer to wear a pair of long swimming trunks for men in surfing style, while others opt for a pair of short swimming trunks for men to maximize the burn. Another model that has become popular recently is the retro-style swim shorts. You can find them in classic colors such as red and blue, and you can also choose whether you prefer with or without lacing at the waist. Complement your beach look with a stylish beach bag and comfortable flip flops. ',
      path: '/clothes/shorts/swim-shorts',
      slug: '/shorts/swim-shorts',
    },
    {
      name: 'Cargo shorts',
      description: '',
      path: '/clothes/shorts/cargo-shorts',
      slug: '/shorts/cargo-shorts',
    },
    {
      name: 'Soft shorts',
      description:
        "Find your personal style by mixing and matching the shorts with the rest of the garments in your wardrobe. The training will be incredibly much more fun when you dress in garments that both sit comfortably and look good. You can also use shorts in soft cotton all year round as comfortable soft shorts. Sometimes you just want to feel comfortable and casually dressed, and then nothing fits better than a pair of jersey shorts and a loose-fitting T-shirt or hoodie. In the summer, they become a good complement to your denim or swim shorts for a relaxed look. Find your favorites with us and update your wardrobe with a bunch of new soft soft men's shorts in different looks.",
      path: '/clothes/shorts/soft-shorts',
      slug: '/shorts/soft-shorts',
    },
  ],
};

const socksAndUnderwearCategories: BasicProductCategory = {
  name: 'Socks & underwear',
  description:
    "The most important feature of men's underwear is that they are comfortable. In our range you will find underwear in the form of boxers, briefs, shorts and thongs - in several different colors and from several well-known brands. In other words, there are several opportunities to find what you feel most comfortable in. Loose and casual shorts or more tight and figure-hugging briefs? Here you will find both models, plus much more. When it comes to lingerie men online, you have every opportunity to build a stable base for any occasion. Fill your warehouse and say hello to worn-out callings and tears that protrude from the socks.",
  path: '/clothes/socks-underwear',
  slug: '/socks-underwear',
  children: [
    {
      name: 'Boxer briefs',
      description:
        "Men's underwear today comes in several different models and among the most popular you will find boxer briefs. These callings have become something of a heavyweight in the industry and a choice many take on every day, or at least have as an alternative in the lingerie box. The soft material together with a firm elastic and the slightly longer legs form an unbeatable combination that most men think is great to have close to the body. Few things can go wrong in your outfit if you start with a pair of comfortable and stylish boxers. We offer boxer briefs in a classic model, with simple base colors or in patterns, your new favorite pair is available at Staytard. The hardest part will be choosing which of all you like best",
      path: '/clothes/socks-underwear/boxer-briefs',
      slug: '/socks-underwear/boxer-briefs',
    },
    {
      name: 'Socks',
      description:
        "Socks are perhaps the most necessary garment in the wardrobe - and at the same time the one that wears the fastest and has a tendency to disappear in the laundry. A comfortable, warm and functional sock that also looks great on the foot and matches your clothing style. Therefore, we dare to say that you are always in need of a pair of comfortable socks. How annoying is it not when all you find in the underwear box are socks that are either uneven, have holes in the toe or a large hole in the heel? Now it's over. You order comfortable, stylish and durable socks online here at Staytard.",
      path: '/clothes/socks-underwear/socks',
      slug: '/socks-underwear/socks',
    },
  ],
};

const jacketAndSuitCategories: BasicProductCategory = {
  name: 'Jacket & suit',
  description:
    "With us you can buy costumes online. Buying a suit or jacket online is very easy thanks to Staytard's wide range, on our website you can choose between brand, color, size, fit and price and a number of options for suit men and jacket men are presented. We have a wide range of stylish costumes in many colors and different cuts. In addition, we have stylish jackets, which gives you the opportunity to choose whether you want to buy an entire suit or just a nice jacket. Our jackets are available in both single and double buttons, where the single buttons have two or three buttons. We have many different types of suits and jackets from a variety of well-known manufacturers - everything from branded jackets to cheaper alternatives. Most of our suits and jackets are made of wool but there are also other options, such as linen jacket men.",
  path: '/clothes/jacket-suit',
  slug: '/jacket-suit',
  children: [
    {
      name: 'Blazers & Jackets',
      description:
        "The blazer originates in England where it is often part of a school uniform. A blazer can be single-breasted or double-breasted, it can be patterned or single-colored and it can be made of a variety of materials. Wool is most common, but during the summer it can be more comfortable with a cotton or linen jacket. The blazer is traditionally a men's garment, but today there are both men's blazers and women's blazers. A blazer should be able to be worn with a thicker shirt underneath and should therefore have a slightly looser fit. During the winter, it is also quite right to have a tweed blazer with a knitted sweater underneath",
      path: '/clothes/jacket-suit/blazers-jackets',
      slug: '/jacket-suit/blazers-jackets',
    },
    {
      name: 'Suit pants',
      description:
        'Suit trousers are traditionally fine trousers, but modern suit trousers are available in several variants. Choose between the classic straight suit pants or suit pants men slim fit. Combined with a polo shirt or knitted V-neck, you are soon ready for dinner. With shorter trouser legs, you can experiment with sock choices and highlight the shoes, we also recommend sometimes mixing styles and, for example, trying on a sneaker with the suit trousers. A real trendsetter might even try on the bomber jacket for the suit pants. You can also try one of our modern models with button fly and angled pockets. For a more exclusive feel, choose wool or tweed trousers with a press crease and longer leg length. If you want to get a classic look, the suit trousers will of course fit perfectly with a matching jacket. Try a real British cricket classic by styling tweed trousers with a shirt and a cable-knit slipover and get a tailor-made finish in the office. Do not let your imagination limit you.',
      path: '/clothes/jacket-suit/suit-pants',
      slug: '/jacket-suit/suit-pants',
    },
  ],
};

export const clothesCategories: BasicProductCategory = {
  name: 'Clothes',
  description:
    "Among the more than 250 brands we offer, you will find giants such as GANT, Morris, Calvin Klein, Peak Performance and many, many more. Our men's clothes are carefully selected to follow the latest trends and at the same time be both high quality and affordable. A good wardrobe, just like a web shop, needs to have both width and depth to be ready for everything. Nothing consciously says anything as well as a perfect shirt or pair of really nice jeans bras. Choose and wreck among pants, shorts, jackets, suits, sweaters, underwear and everything else that a modern man's wardrobe needs to be equipped with. Order your clothes for men from Staytard - we help you take your style to a whole new level",
  path: '/clothes',
  slug: '/clothes',
  children: [
    jacketsCategories,
    sweatersCategories,
    jeansCategories,
    pantsCategories,
    tShirtsCategories,
    shirtsCategories,
    shortsCategories,
    socksAndUnderwearCategories,
    jacketAndSuitCategories,
  ],
};

export const shoesCategories: BasicProductCategory = {
  name: 'Shoes',
  description:
    "The shoes are not only what you wear when you go out, but there should be a certain amount of thought and planning when it comes to your dojos. The style-conscious man understands the importance of owning several pairs of shoes for men so that he can vary and choose based on occasion. Every man's shoe shelf should therefore have a pair of fine shoes, a pair of neutral everyday shoes and a pair of slightly more worn shoes, for example well-fitted sneakers. When the seasons change, there are also shoes that match the weather. When it's summer, a pair of cloth shoes and sandals is a must and for autumn and winter you should have a pair of boots and thicker boots ready in the wardrobe. Feel free to vary all these models when it comes to color and design. A pair of cool black boots with lacing fits most things and matches nicely with the slightly darker garments we usually choose during autumn and winter. The fabric shoes can be worn in a lighter color scheme to match the wonderful weather and light up the day during spring and summer. But in the end, it's your personal style that matters.",
  path: '/shoes',
  slug: '/shoes',
  children: [
    {
      name: 'Boots',
      description:
        'Do you want to get a stylish look from head to toe? Then start your outfit with a pair of impeccable boots or boots. In our range you will find several different boots boots and boots shoes, including boots with a slightly higher shaft and lacing and the slightly lower variants without lacing. You can choose from several different colors and also if you want boots in leather or suede. Although boots may be reminiscent of colder weather, they are not just autumn or winter boots. There are several variants that can be used as both spring and summer shoes for men. How you want to match your boots is up to you, take a look at our range and find the perfect model for you.',
      path: '/shoes/boots',
      slug: '/boots',
    },
    {
      name: 'Sneakers & fabric shoes',
      description:
        'There are several well-known brands when it comes to textile shoes and sneakers for men. Some we have already seen a lot of and will see even more of are, among others, Converse which you will find in the range. If you invest in this classic, you can be sure that you will never be unclean. But if you are looking for something completely different, it is also easy to find thanks to the large selection of sneakers online, not least at Staytard. Choose between low or high sneakers in different colors, models and materials from brands such as Björn Borg, Sneaky Steve, Dr. Martens and Gant just to name a few. Sneakers have sprung from the sports world, which guarantees comfortable shoes regardless of design or brand. Invest in a thinner textile shoe that is perfect during the hotter days of summer or a pair in leather with stylish details that can withstand most seasons',
      path: '/shoes/sneakers-fabric-shoes',
      slug: '/sneakers-fabric-shoes',
    },
    {
      name: 'Flip flops & sandals',
      description:
        "A complete beach outfit consists of your favorite swim shorts, a simple tank top or a loose T-shirt and on the feet are a pair of cool flip flops or stylish sandals. When the temperature reaches higher degrees, it's nice not to lock your feet in a pair of sneakers or cloth shoes where they get sweaty. Instead, let the foot breathe in a comfortable and airy shoe like the sandal. If you are unsure of which style is hottest this summer, we are more than happy to help you find the right one, in our range you will find both trendy and classic models that will gild your feet during hot days. Here are models in different colors and designs, so you can find just the right one. Buying sandals online has never been easier",
      path: '/shoes/flip-flops-sandals',
      slug: '/flip-flops-sandals',
    },
  ],
};

export const accessoriesCategories: BasicProductCategory = {
  name: 'Accessories',
  description:
    'What accessories should you have in the closet? We help you with tips for putting together a stable basic kit of accessories men that get you ready for both everyday and solemn occasions. Those who often wear a shirt or jacket should invest in owning at least a tie or bow tie, handkerchief and watch. It creates an aesthetic balance on the upper body, while the details provide stylish contrasts. In addition, the accessories are easy to wear and are excellent for both formal and informal situations, which makes them a grateful gadget to own. Feel free to supplement with cufflinks and tie pin. In everyday life, it is convenient to have some form of headdress, either to cover up for a bad hair day or to protect against the forces of the weather. A stylish bag together with a scarf also gives the everyday look extra spice. Complete the look with one or more bracelets. At Staytard, we have a stable range of accessories with attitude and style',
  path: '/accessories',
  slug: '/accessories',
  children: [
    {
      name: 'Hats & caps',
      description:
        "The hat is becoming more trendy with each passing year and we think it is a real joy. At Staytard, we love hat fashion and want everyone to be able to feel comfortable in a felt hat in the summer. When autumn comes, change into a rain hat, then throw on a knitted hat and keep your ears warm when the wolf winter arrives. And who says it needs to stay there? The hat works all year round, a simple in thinner material is perfect when you do not stool fix your hair on a stressful morning. The cap also works in its many different variants. Summer, autumn, winter - a good cap always works. Or - almost always. Not for a suit at your polar bear's wedding, then you can wear a handsome felt hat in black instead. ",
      path: '/accessories/hats-caps',
      slug: '/hats-caps',
      children: [
        {
          name: 'Hats',
          description:
            "The hat has been a way for men to dress up and we understand why. A hat is all that is needed for an outfit to be more stylish than ever and therefore we at Staytard offer a wide range of this simple improvement. We have all wanted to feel like Humphrey Bogart at some point and a hat will help you get the right feeling. We have all wanted to protect the hairstyle from the changeable Swedish weather - even here the hat fulfills its function. We have also all at one time or another thought that the new coat together with the nicely worn boots lacks something - of course it is the hat we are looking for. A men's hat is so much more than a headdress, it's style all the way to the top. Choose and wreck among our hats men.",
          path: '/accessories/hats-caps/hats',
          slug: '/hats-caps/hats',
        },
        {
          name: 'Caps',
          description:
            "The cap is the classic garment that does not become outdated. It does not matter what color, shape or model is your style, you will be trendy with a cap on your head. You already had the good old baseball cap as a little boy when you kicked football behind the house and it still works today. Snapback caps have recently become really popular and here at Staytard we therefore of course offer a large selection of these stylish heights. The hockey guys' favorites are not so unpredictable NHL caps, which with a classic design ooze with sport, winning skull and a sense of trend. Upgrade your cap wardrobe with some new models that are perfect for the match, work, school, gym and at home on the couch. That is, everywhere you are.",
          path: '/accessories/hats-caps/caps',
          slug: '/hats-caps/caps',
        },
      ],
    },
    {
      name: 'Watches',
      description:
        'Find your favorite watch in a classic or modern cut with a leather bracelet or metal bracelet in gold. We have watches from brands such as GANT, Morris, BOSS and Tommy Hilfiger and offer fast deliveries.',
      path: '/accessories/watches',
      slug: '/watches',
    },
    {
      name: 'Sunglasses',
      description:
        "Sunglasses are one of the few accessories that have both a high trend factor and a real function. They both protect your eyes from bright light and help you look really cool. Nowadays, sunglasses are used all year round and a pair of stylish frames complements any outfit. There are a plethora of models to choose from, ranging from classic black pilot goggles to sporty frames. The rule of thumb when it comes to choosing sunglasses is to choose with care, few accessories stand out as much as sunglasses. If you do not know what to choose, you can take the safe card and bet on something classic black that suits most styles. In the end, the most important thing is that you thrive in them. With us you will find a large selection of men's sunglasses, from discreet and classic to distinctive and modern.",
      path: '/accessories/sunglasses',
      slug: '/sunglasses',
    },
    {
      name: 'Belts & braces',
      description:
        "Most people know the difference between braces and belts. But for what clothes, and on what occasions should they be used? Let's sort this out. The belts work for jeans, chinos, suit trousers, shorts and basically all trouser variants that have loops. However, you see all too often that the belt is matched 'wrong'. A tip is to match the belt with the shoes. Black leather shoes do best with a black leather belt and the same rule of thumb applies to brown colors. Style, however, is about taste, taste and experimentation, so do not limit yourself - dare to try new combinations. Braces then? In general, braces are best suited for suit trousers in different variants - alternatively for jeans or chinos. Color matching is basically the same as for belts, but keep in mind that the color of the braces should not cut against the shirt.",
      path: '/accessories/belts-braces',
      slug: '/belts-braces',
    },
    {
      name: 'Ties',
      description:
        'The tie is the garment that should be in your wardrobe. A well-fitting tie in good quality and the right color gives your suit a proper facelift. An ordinary white shirt can also be more festive with the help of a simple tie. We at Staytard think it should be easy to feel handsome and therefore offer a varied range of stylish, cheap ties, and you can easily find the tie that matches your style. A black suit can feel a little too serious sometimes and a fun tie cheers up both you and the party. Also, do not forget to fix a nice tie pin that fits, and a nice shirt that keeps the shape all evening - here at Staytard there is everything for a successful outfit.',
      path: '/accessories/ties',
      slug: '/ties',
    },
    {
      name: 'Bags & wallets',
      description:
        "The demand for men's bags has increased dramatically, which is not so strange when a computer, Ipad or telephone are export constant companions that require good storage. Therefore, there are now significantly more stylish models to choose from than just a few years ago. At Staytard, we have a wide range of men's bags, everything from modern backpacks to stylish briefcases and we invest in popular brands known for their quality. A bag or wallet is like any other accessory, it can be used to convey a statement or reflect a personal style. Therefore, choose your bag with care, the right type can work for several styles, otherwise you can get more choices with a few different ones.",
      path: '/accessories/bags-wallets',
      slug: '/bags-wallets',
      children: [
        {
          name: 'Wallets',
          description:
            "In Staytard's exclusive range of men's wallets, you will find several nice models. The classic that you can open up with space for cards, banknotes and coins. The one with a zipper around that is both nice and safe - or completely flat models where there is room for the most important cards. Which model suits you and your style best? A nice leather or leather wallet of high quality becomes nicer the more it wears and the leather often becomes more beautiful over the years. So it's a wallet Mr. Skin to age with. The wallet is one of the most important accessories for the modern man, so choose an exclusive, stylish men's wallet that enhances your style and gives a complete overall impression. Find your wallet here at Staytard and make sure you wear it from top to toe in style.",
          path: '/accessories/bags-wallets/wallets',
          slug: '/bags-wallets/wallets',
        },
        {
          name: 'Backpacks',
          description:
            "Our backpacks are available in several different designs and materials and therefore also in different price ranges. We have gorgeous backpacks that are specially designed for computers with padded compartments to protect your valuable electronics. Perfect for distributing weight and avoiding carrying your heavy computer bag on one shoulder. Let your backpack be a part of your style and make sure to maximize with stylish design and good features. The backpack has been forgotten for a few years but has received a real boost again. At Staytard, you can be sure that you will find the backpack you are looking for. You can easily order the backpack you like at home and try it at home in peace and quiet - it's probably a jackpot!",
          path: '/accessories/bags-wallets/backpacks',
          slug: '/bags-wallets/backpacks',
        },
        {
          name: 'Computer bags & computer cases',
          description:
            'There are lots of briefcases and computer bags on the market and we have collected the nicest and most trend-safe right now. With a computer bag leather, your main work tool is well protected. In it you can also put important papers and other things that belong to the office to have everything in one place. The bags in our range are a mix of classic and modern models from popular and established brands that are in right now. When you buy a computer bag, gentleman, you never compromise on the trend factor! It is common knowledge that a really nice leather bag does not go out of date and frankly, it can not be more classic than that. With us, you will find several models in nicely durable leather that guarantees a serious impression at work or in the plug.',
          path: '/accessories/bags-wallets/computer-bags-cases',
          slug: '/bags-wallets/computer-bags-cases',
        },
      ],
    },
  ],
};

export const lifestyleCategories: BasicProductCategory = {
  name: 'Lifestyle',
  path: '/lifestyle',
  description:
    "Building a lifestyle you like is a way to become comfortable with yourself. The perfume that symbolizes the personality, the right shaving tools with associated creams that you can perform 'gentleman' shaves with, the headphones that match your outfit and the hair products that give you the right hairstyle. In our range of lifestyle products, you will find most things clean and maybe a little more in all these areas",
  slug: '/lifestyle',
  children: [
    {
      name: 'Face & Body',
      description:
        'Face and body - two important areas to focus your vanity on all year round. If you have dry skin in the winter, there are several skin creams that help, or if you need to set up a really good shaving routine, you have the products for both before, after and during shaving. Rounding off with a good perfume is a must and preferably a deo stick for it. Take a look through our range to get the inspiration for the gentleman and a break or update both face and body.',
      path: '/lifestyle/face-body',
      slug: '/lifestyle/face-body',
      children: [
        {
          name: 'Skincare',
          description:
            'Facial care is something you can cheat with when you are young but when the years catch up you will regret that you did not take care of it better. It is unnecessary because it can be so simple. We at Staytard offer a number of beautiful products for facial care men that will be at your service both in the short and long term. For example, invest in a white smile with our elegant Marvis toothpastes, reduce bags under the eyes or acne with a product from Recipe For Men or buy a proper face wash and minimize the risk of getting acne in the first place. We at Staytard offer a solid range of cool facial care products for men - find the perfect products for your face with us.',
          path: '/lifestyle/face-body/skincare',
          slug: '/face-body/skincare',
        },
        {
          name: 'Hair care',
          description:
            "Whether you have a little or a lot of hair, a styled hairstyle or one that requires almost nothing at all, the hair is part of your style. Let the hair care take place in your everyday life and try your hand at what suits you best. The right hair care products adapted for men make the job easier and your hairstyle fits nicely all day. We have styling products, waxes, mousse, sprays and men's hair care products in all categories from brands such as Dapper Dan, Remington, Babyliss and Beard Monkey. Choose from our large range of hair care men and complement with styling tools, body care, clothes and accessories. With us, you can order everything you need for a stylish hairstyle that suits the rest of your outfit, your wallet and your personality",
          path: '/lifestyle/face-body/hair-care',
          slug: '/face-body/hair-care',
        },
        {
          name: 'Perfume',
          description:
            'When buying perfume, think about what you want to use it for and on what occasions it should be suitable. An everyday perfume often has a more subtle scent and can be of the after shave or Eau de Cologne type. A perfume for the party can smell a little stronger and then you are welcome to choose an Eau de Toilette. Choose spray or regular bottle and drip in small drops on pulse points such as the neck and wrist to get the maximum scent. After shave can be applied to the face just after shaving and then also has a certain antiseptic function. Find masculine fragrance and perfume online and switch between your favorites. We have many well-known classic brands and trendy newcomers in fantastically beautiful designed packaging',
          path: '/lifestyle/face-body/perfume',
          slug: '/face-body/perfume',
        },
        {
          name: 'Body care',
          description:
            "Start the day with a shower and a cleansing shower gel. Supplement with scrub creams once a week to produce new, fresh skin. Then there is shaving. Whether you have a beard or are clean-shaven, your beard needs a review every day. Long beards should be styled and everything else should be shaved. Use shaving creams and styling products for your skin type and beard style. Then it's the hair's turn. Style, shape and create your own look with products and tools for all hairstyles. Finish the routine with the right scent. Perfume, after shave, spray, splash or balm - what is your style and fragrance? With us, we think that you should find your unique style and that it should feel personal and conscious.",
          path: '/lifestyle/face-body/body-care',
          slug: '/face-body/body-care',
          children: [
            {
              name: 'Deodorant',
              description:
                "Deodorant for men should have several functions. It should prevent you from sweating too much, it should smell good and it should give a fresh feeling that lasts all day. Each brand has its own characteristics. Choose from stick, roll on, spray or talc stick and find the one that is most flexible for you. Men's deodorant is available for all men and all styles. Do you want a classic light scent, or a little heavier for the party? The completely neutral ones, which do not smell at all, are suitable for those who do not like scents or who invest in other fragrant body care - such as body lotion, aftershave or perfume. Do you have a heavy job and sweat a lot or do you exercise a lot and often? Then a strong deodorant men can be a good idea. Invest in a few different types of deodorant men, and you will have it for every occasion.",
              path: '/lifestyle/face-body/body-care/deodorant',
              slug: '/body-care/deodorant',
            },
            {
              name: 'Shower gel',
              description:
                'At Staytard, we have collected shower creams in all possible scents. Soap and water dry out the skin and with a shower cream you care for and moisturize the skin in a good way.',
              path: '/lifestyle/face-body/body-care/shower-gel',
              slug: '/body-care/shower-gel',
            },
          ],
        },
        {
          name: 'Shaving & beard care',
          description:
            "Like the hair you have on your head, your beard and mustache are exposed to stress daily. It can be about weather changes, that you pull your fingers through it or that you have dry skin that results in skin flakes accumulating in the beard. A beard and a mustache need to be cared for in the same way as you take care of your facial or other hair care. Therefore, invest in using only the best of products. When it comes to styling your beard, there are also several ways in this category to get the look you are looking for if you have a good beard wax and mustache wax. You will find several high-quality and stable waxes in Staytard's range - all with a charter that will last all day.",
          path: '/lifestyle/face-body/shaving-beard-care',
          slug: '/face-body/shaving-beard-care',
          children: [
            {
              name: 'Shaver & beard trimmer',
              description:
                'There are several different models of razors and trimmers, most are similar but there may still be differences in terms of price, battery life and precision. Think about what your needs are. For example, you may often be traveling and need a rechargeable shaver with an extra long battery life? The same goes for trimmers. A trimmer for nose or ear hair naturally has a completely different shape and capacity than the one you use to trim your hair - maybe you need both? In our range of shavers and trimmers, you can find what you need to keep your wild beard in check or cut a nice mohawk frill',
              path: '/lifestyle/face-body/shaving-beard-care/shaver-beard-trimmer',
              slug: '/shaving-beard-care/shaver-beard-trimmer',
            },
            {
              name: 'Shaving accessories',
              description:
                'It is important to think about what you use for products when shaving to get a good result. When was the last time you replaced the products you use for shaving? If it was a while ago, it may be high time to procure new shaving products for men to be gentle on the skin. It is also important that you who have a majestic beard take care of it so that it is well-trimmed and feels and looks fresh. It requires sharp scissors and trimmers with sharp blades. Both shaving products and beard care products are those that are used extensively, which means that it is worth investing in good stuff that lasts a long time. With us, you will find a wide range of beard kits and razors that give you a comfortable and smooth shave and beard care.',
              path: '/lifestyle/face-body/shaving-beard-care/shaving-accessories',
              slug: '/shaving-beard-care/shaving-accessories',
            },
            {
              name: 'Beard oil',
              description:
                'A prickly and dry beard is not fun for anyone, neither for you nor for the one who kisses you. The dry beard can also itch and feel dry all the way to the root. Then a factor is required that can soften it and make it as smooth and comfortable as the hair you have on your head. At Staytard, you will find several different beard oils from major brands such as Beard Junk, Dapper Dan and Proraso, all developed to give your beard the most regal of treatments. You massage the beard oil into the beard as a last step after you have shaved or washed it. Then let it work wonders. Try on a beard oil for a week and we promise that you will notice a significant difference - you have nothing to lose.',
              path: '/lifestyle/face-body/shaving-beard-care/beard-oil',
              slug: '/shaving-beard-care/beard-oil',
            },
            {
              name: 'Beard tools',
              description: '',
              path: '/lifestyle/face-body/shaving-beard-care/beard-tools',
              slug: '/shaving-beard-care/beard-tools',
            },
          ],
        },
      ],
    },
  ],
};
