[[i= partials/header ]]

<div class="cardHolder">
    [[?= students.length > 0 ]]
        [[e= student in students ]]
            [[c= components/student || name=student.name studentID=student.id ]]
        [[?==]]
    [[3=]]
        <p id="noStudents" style="text-align: center">There aren't any students registered!</p>
    [[?==]]
</div>


<script src="/assets/js/students.js"></script>

[[l= components/student ]]
[[i= partials/footer ]]