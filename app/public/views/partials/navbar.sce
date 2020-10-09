<div class="flex navbar">
    [[e= navItem in nav ]]
    <div class="navbarItem
    [[?= page.toLowerCase() == navItem.toLowerCase() || (page.toLowerCase() == '' && navItem.toLowerCase() == 'home') ]]
    active
    [[?==]]
    " target="[[ navItem ]]">[[ navItem ]]</div>
    [[?==]]
</div>