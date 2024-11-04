import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

function Home() {
    return (
        <main>
            <h3>Plusieurs recettes faciles et rapides pour vous inspirer en cuisine.</h3>
            <h2>Les recettes salées de saison en Octobre</h2>
            <section className='recettes_3'>
                <ul>
                    <article className='article_recettes'>
                        <Link to="/recipe/croques-monsieur-au-four-de-ma-grand-mere">
                            <div className="image-container">
                                <img alt="Croques monsieur" src="https://img.cuisineaz.com/400x500/2016/09/03/i94824-croques-monsieur-au-four-de-ma-grand-mere.jpg"/>
                            </div>
                            <p>Croques-monsieur au four de ma grand-mère</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/soupe-au-potimarron-facile">
                            <div className="image-container">
                                <img alt='Soupe au potimarron facile' src='https://img.cuisineaz.com/400x500/2021/09/21/i180674-soupe-potimarron-facile.jpeg'/>
                            </div>
                            <p>Soupe au potimarron facile</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/moussaka-facile">
                            <div className="image-container">
                                <img alt='Moussaka facile' src='https://img.cuisineaz.com/400x500/2013/12/20/i5178-moussaka.jpg'/>
                            </div>
                            <p>Moussaka facile</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/gratin-de-chou-fleur">
                            <div className="image-container">
                                <img alt='Gratin de chou-fleur' src='https://img.cuisineaz.com/400x500/2013/12/20/i45705-photo-de-gratin-de-chou-fleur.jpeg'/>
                            </div>
                            <p>Gratin de chou-fleur</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/couscous-royal">
                            <div className="image-container">
                                <img alt='Couscous royal' src='https://img.cuisineaz.com/400x500/2016/04/28/i15329-couscous-royal.jpg'/>
                            </div>
                            <p>Couscous royal</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/purée-de-pommes-de-terre-maison">
                            <div className="image-container">
                                <img alt='Purée de pommes de terre maison' src='https://img.cuisineaz.com/400x500/2013/12/20/i37576-puree-de-pommes-de-terre-maison.jpeg'/>
                            </div>
                            <p>Purée de pommes de terre maison</p>
                        </Link>
                    </article>
                </ul>
            </section>
            <h2>Les recettes sucrées de saison en Octobre</h2>
            <section className='recettes_3'>
                <ul>
                    <article className='article_recettes'>
                        <Link to="/recipe/gateau-aux-pommes-moelleux">
                            <div className="image-container">
                                <img alt='Gâteau aux pommes moelleux' src='https://img.cuisineaz.com/400x500/2013/12/20/i12664-gateau-aux-pommes-moelleux.jpg'/>
                            </div>
                            <p>Gâteau aux pommes moelleux</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/crumble-facile-aux-pommes-express">
                            <div className="image-container">
                                <img alt='Crumble facile aux pommes express' src='https://img.cuisineaz.com/400x500/2013/12/20/i95136-crumble-facile-aux-pommes-express.jpg'/>
                            </div>
                            <p>Crumble facile aux pommes express</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/tiramisu-simple">
                            <div className="image-container">
                                <img alt='Tiramisu simple' src='https://img.cuisineaz.com/400x500/2023/11/20/i196570-tiramisu-simple.jpg'/>
                            </div>
                            <p>Tiramisu simple</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/brownie-facile">
                            <div className="image-container">
                                <img alt='Brownie facile' src='https://img.cuisineaz.com/400x500/2013/12/20/i42812-brownie.jpeg'/>
                            </div>
                            <p>Brownie facile</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/banana-bread">
                            <div className="image-container">
                                <img alt='Banana bread' src='https://img.cuisineaz.com/400x500/2015/06/22/i76665-recette-banana-bread.jpg'/>
                            </div>
                            <p>Banana bread</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/compote-de-pommes">
                            <div className="image-container">
                                <img alt='Compote de pommes' src='https://img.cuisineaz.com/400x500/2013/12/20/i1253-compote-de-pommes.jpeg'/>
                            </div>
                            <p>Compote de pommes</p>
                        </Link>
                    </article>
                </ul>
            </section>
            <h2>Le top du top de nos recettes</h2>
            <section className='recettes_4'>
                <ul>
                    <article className='article_recettes'>
                        <Link to="/recipe/crepes-faciles">
                            <div className="image-container">
                                <img alt='Crêpes faciles' src='https://img.cuisineaz.com/350x280/2015/01/29/i113699-photo-de-crepe-facile.jpeg'/>
                            </div>
                            <p>Crêpes faciles</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/cookies-faciles">
                            <div className="image-container">
                                <img alt='Cookies faciles' src='https://img.cuisineaz.com/350x280/2015/11/05/i71617-recette-des-cookies-moelleux-aux-pepites-de-chocolat.jpg'/>
                            </div>
                            <p>Cookies faciles</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/pate-a-gaufres">
                            <div className="image-container">
                                <img alt='Pâte à gaufres' src='https://img.cuisineaz.com/350x280/2024/05/30/i198548-pate-gaufres.jpg'/>
                            </div>
                            <p>Pâte à gaufres</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/fondant-au-chocolat">
                            <div className="image-container">
                                <img alt='Fondant au chocolat' src='https://img.cuisineaz.com/350x280/2015/05/28/i75546-fondant-au-chocolat-de-delphine.jpg'/>
                            </div>
                            <p>Fondant au chocolat</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/lasagnes-a-la-bolognaise-facile">
                            <div className="image-container">
                                <img alt='Lasagnes à la bolognaise facile' src='https://img.cuisineaz.com/350x280/2024/07/26/i199120-lasagnes-a-la-bolognaise-facile.jpg'/>
                            </div>
                            <p>Lasagnes à la bolognaise facile</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/puree-de-pommes-de-terre-maison">
                            <div className="image-container">
                                <img alt='Purée de pommes de terre maison' src='https://img.cuisineaz.com/350x280/2013/12/20/i37576-puree-de-pommes-de-terre-maison.jpeg'/>
                            </div>
                            <p>Purée de pommes de terre maison</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/spaghettis-bolognaise-maison">
                            <div className="image-container">
                                <img alt='Spaghettis bolognaise maison' src='https://img.cuisineaz.com/350x280/2013/12/20/i71303-recette-pate-spaghettis-bolognaise-maison.jpg'/>
                            </div>
                            <p>Spaghettis bolognaise maison</p>
                        </Link>
                    </article>
                    <article className='article_recettes'>
                        <Link to="/recipe/gratin-dauphinois-simplissime">
                            <div className="image-container">
                                <img alt='Gratin dauphinois simplissime' src='https://img.cuisineaz.com/350x280/2015/12/10/i28215-gratin-dauphinois-simplissime-cuisineaz.jpg'/>
                            </div>
                            <p>Gratin dauphinois simplissime</p>
                        </Link>
                    </article>
                </ul>
            </section>
        </main>
    );
}

export default Home;
