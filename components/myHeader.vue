<template>
    <header class="header-pc">
        <RouterLink to="/" class="header-pc_logo">
            <iconLogo/>
        </RouterLink>

        <hr class="header-pc_deco"/>

        <nav class="header-pc_page">
            <ul>
                <li><RouterLink to="/">Accueil</RouterLink></li>
                <li><RouterLink to="/historique">Historique</RouterLink></li>
                <li><RouterLink to="/regles">Règles</RouterLink></li>
                <li><RouterLink to="/foire-aux-questions">FAQ</RouterLink></li>
                <li><RouterLink to="/#a-propos">à Propos & Contact</RouterLink></li>
            </ul>
        </nav>

        <hr class="header-pc_deco"/>

        <nav class="header-pc_icons">
            <ul>
                <li><myIcon cercle="true" url="https://www.instagram.com/smash_arena_event"/></li>
                <li><myIcon name = "x" cercle="true" url="https://twitter.com/SmashArenaEvent"/></li>
                <li><myIcon name = "facebook" cercle="true" url="https://www.facebook.com/people/Smash-Arena-Event/61553864250828/"/></li>
            </ul>
        </nav>
    </header>

    <header class="header-mobile">
        <div class="header-mobile_head">
            <RouterLink to="/" class="header-mobile_head-logo">
                <iconLogo/>
            </RouterLink>

            <div class="header-mobile_head-menu" @click="menuOuvert = !menuOuvert" :class="{ 'menu--ouvert': menuOuvert }">
                <div class="menu_bar bar_top"></div>
                <div class="menu_bar bar_mil"></div>
                <div class="menu_bar bar_bot"></div>
            </div>
        </div>

        <Transition>
            <div v-if="menuOuvert" class="header-mobile_page">
                <nav class="header-mobile_page-nav">
                    <ul>
                        <li><myButton url="/" @click="menuOuvert = !menuOuvert">Accueil</myButton></li>
                        <li><myButton url="/historique" @click="menuOuvert = !menuOuvert">Historique</myButton></li>
                        <li><myButton url="/regles" @click="menuOuvert = !menuOuvert">Règles</myButton></li>
                        <li><myButton url="/foire-aux-questions" @click="menuOuvert = !menuOuvert">FAQ</myButton></li>
                        <li><myButton url="/#a-propos" @click="menuOuvert = !menuOuvert">Contact</myButton></li>
                    </ul>
                </nav>

                <deco class="header-mobile_page-deco deco_1"/>
                <deco class="header-mobile_page-deco deco_2"/>
            </div>
        </Transition>
    </header>
</template>

<style lang="scss">
.header-pc{
    display: none;
    justify-content: space-between;
    align-items: center;
    margin: $m-medium;

    &_logo{
        display: block;
        width: 50px;
        height: fit-content;
        fill: $color-white;
        transition: all 0.5s;
        flex: none;
    
        &:hover{
            fill: $color-main
        }
    
        @include medium{
            width: 90px;
        }
    }

    &_page{
        @include bouton;
        width: 100%;
        max-width: $md;
        
        ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 5px;

            li{
                transition: all 0.5s;
                &:hover{
                    color: $color-main;
                }

            }
        }

    }

    &_icons{        
        ul{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: $m-small;

            li{
                width: 50px;
                aspect-ratio: 1/1;
            }
        }
    }

    &_deco{
        width: 5%;
        height: 1;
        margin: $m-small;
        background-color: $color-white;
    }

    @include large{
        display: flex;
    }
}

.header-mobile{
    z-index: 50;
    position: sticky;
    top: 0;
    width: 100vw;
    background: $color-black;

    &_head{
        position: relative;
        z-index: 48;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        padding: $m-small;

        &-logo{
            flex: none;
            width: 50px;
            fill: $color-white;
        }

        &-menu{
            height: 30px;
            width: 50px;
            position: relative;
            cursor: pointer;

            .menu_bar{
                position: absolute;
                width: 50px;
                height: 5px;
                transform-origin: center;
                background: $color-white;
                left: 0;
            }

            .bar_top{
                top: 0;
            }
            .bar_mil{
                transform: translateY(-50%);
                top: 50%;
            }
            .bar_bot{
                bottom: 0;
            }
        }

        .menu--ouvert{
            
            .menu_bar{
                transform-origin: center;
                transition: all 0.5s ease-in-out;
                top: 50%;
            }

            .bar_top{
                transform: translateY(-25%);
                rotate: -45deg;
            }

            .bar_mil{
                opacity: 0;
            }

            .bar_bot{
                transform: translateY(25%);
                rotate: -135deg;
            }
        }

        @include medium{
            padding: $m-small $m-medium;

            &-logo{
                width: 80px;
            }

            &-menu{
                width: 80px;
                height: 35px;
            }
        }

    }

    &_page{
        z-index: 45;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: $color-black;
        overflow: hidden;

        &-nav{
            z-index: 47;
            position: relative;
            width: 100%;
            height: 100%;
            opacity: 1;

            ul{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: $m-medium;
                width: fit-content;
                height: 100%;
                margin: auto;
            }
        }

        &-deco{
            z-index: 46;
            position: absolute;
            display: block;
            width: 70%;
            height: fit-content;
            rotate: 45deg;
        }

        .deco_1{
            top: -60%;
            right: 0;
        }

        .deco_2{
            bottom: -50%;
            left: 20%;
        } 
    }

    // description et classe de la transition
    .v-enter-active{
        transition: opacity 0.5s ease;
        -webkit-transition: opacity 0.5s ease;
        -moz-transition: opacity 0.5s ease;
        -o-transition: opacity 0.5s ease;
        -ms-transition: opacity 0.5s ease;
        
        .header-mobile_page-nav{
            transition: opacity 0.3s 0.3s ease-in-out;
            -webkit-transition: opacity 0.3s 0.3s ease-in-out;
            -moz-transition: opacity 0.3s 0.3s ease-in-out;
            -o-transition: opacity 0.3s 0.3s ease-in-out;
            -ms-transition: opacity 0.3s 0.3s ease-in-out;
        }        
        
        .header-mobile_page-deco{
            transition: right 0.3s 0.5s ease, top 0.3s 0.5s ease, bottom 0.3s 0.5s ease, left 0.3s 0.5s ease,;
            -webkit-transition: right 0.5s ease, top 0.5s ease, bottom 0.5s ease, left 0.5s ease,;
            -moz-transition: right 0.3s 0.5s ease, top 0.3s 0.5s ease, bottom 0.3s 0.5s ease, left 0.3s 0.5s ease,;
            -o-transition: right 0.3s 0.5s ease, top 0.3s 0.5s ease, bottom 0.3s 0.5s ease, left 0.3s 0.5s ease,;
            -ms-transition: right 0.3s 0.5s ease, top 0.3s 0.5s ease, bottom 0.3s 0.5s ease, left 0.3s 0.5s ease,;
        }        
    }
    .v-leave-active {
        transition: opacity 0.5s 0.3s ease;
        -webkit-transition: opacity 0.5s 0.3s ease;
        -moz-transition: opacity 0.5s 0.3s ease;
        -o-transition: opacity 0.5s 0.3s ease;
        -ms-transition: opacity 0.5s 0.3s ease;
        
        .header-mobile_page-nav{
            transition: opacity 0.2s 0.1s ease-in-out;
            -webkit-transition: opacity 0.2s 0.1s ease-in-out;
            -moz-transition: opacity 0.2s 0.1s ease-in-out;
            -o-transition: opacity 0.2s 0.1s ease-in-out;
            -ms-transition: opacity 0.2s 0.1s ease-in-out;
        }        
        
        .header-mobile_page-deco{
            transition: right 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease,;
            -webkit-transition: right 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease,;
            -moz-transition: right 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease,;
            -o-transition: right 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease,;
            -ms-transition: right 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease,;
        }        
    }
    
    // classe lorsque le menu est fermé
    .v-enter-from,
    .v-leave-to {
        opacity: 0;

        .header-mobile_page-nav{
            opacity: 0;
        }

        .deco_1{
            top: -110%;
            right: -100%;
        }

        .deco_2{
            bottom: -100%;
            left: -100%;
        } 
    }


    @include large{
        display: none;
    }
}

</style>

<script setup>
const menuOuvert= ref(false)
</script>