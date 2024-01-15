<template>
    <footer class="footer">
        <RouterLink to="/" class="footer_logo">
            <iconLogo/>
        </RouterLink>

        <nav class="footer_pages">
            <ul>
                <li><RouterLink to="/">Accueil</RouterLink></li>
                <li><RouterLink to="/historique">Historique</RouterLink></li>
                <li><RouterLink to="/regles">Règles</RouterLink></li>
                <li><RouterLink to="/foire-aux-questions">FAQ</RouterLink></li>
                <li><RouterLink to="/#a-propos">à propos & contact</RouterLink></li>
            </ul>
        </nav>

        <nav class="footer_icons">
            <ul>
                <li><myIcon cercle="true" url="https://www.instagram.com/smash_arena_event"/></li>
                <li><myIcon name = "x" cercle="true" url="https://twitter.com/SmashArenaEvent"/></li>
                <li><myIcon name = "facebook" cercle="true" url="https://www.facebook.com/people/Smash-Arena-Event/61553864250828"/></li>
            </ul>
        </nav>

        <div class="footer_legaux">
            <RouterLink to="/">Mention légal</RouterLink>
            <RouterLink to="/">RGPD</RouterLink>
            <p>©Smash Arena EVenet 2023</p>
        </div>
    </footer>
</template>

<style lang="scss">
.footer{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: $m-litle;
    width: 100vw;
    height: fit-content;
    padding: $m-litle;
    background: $color-gray_darken;

    &_logo{
        flex: none;
        width: 60px;
        fill: $color_main;
    }

    &_pages{
        @include p;
        width: 100%;
        font-weight: $font_weight-bold;
        text-transform: capitalize;

        ul{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 1rem;
            width: 100%;
            max-width: $sm;
            height: 100px;

            li{
                :hover{
                    color: $color-main;
                }
            }
        }
    }

    &_icons{
        width: 100%;

        ul{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            gap: 10px;

            li{
                width: 40px;
                aspect-ratio: 1/1;
            }
        }
    }

    &_legaux{
        @include p;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: $color-gray;

        > * {
            text-align: center;
        }
    }

    @include medium{
        gap: $m-medium;
        padding: $m-big;
        padding-bottom: $m-litle;

        &_logo{
            width: 100px;
        }

        &_pages{
            width: 50%;

            ul{
                max-width: $md;
                height: 110px;
            }
        }

        &_icons{
            width: fit-content;
            height: fit-content;

            ul{
                gap: $m-small;

                li{
                    width: 50px;
                }
            }
        }

        &_legaux{
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            gap: $m-medium;
        }
    }
}
</style>

<script setup>

</script>