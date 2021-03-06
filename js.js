
const form = document.getElementById('form');

    form.addEventListener('submit',formSend);
    async function formSend(e) {
        e.preventDefault();
         let names = document.getElementById('name');
            let email = document.getElementById('email');
            let date = document.getElementById('date');
            let soglasie = document.getElementById('soglasie');
        let gender = document.getElementByName('gender');
        let body = document.getElementByName('body');
        let error = formValidate(form);

        let formData = new FormData(form);


        if(error===0){
            form.classList.add('_sending');
           
            let response = await fetch('form.php',{
            method: 'POST',
            body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.massage);
                form.reset();
                form.classList.remove('_sending');
            }else{
                alert("Ошибка");
                form.classList.remove('_sending');
            }
            
        }else{
           
            if(names.value ===''){
                alert('Ошибка в поле Имя!');
            }    
            if(emailTest(email)){
                alert('Ошибка в поле email!');
            }           
            if(date.value=== ''){
                alert('Ошибка в поле Дата рождения!');
            }
            if(soglasie.checked=== false){
                alert('Подтвердите согласие!');
            }
            
        }
        
        if(date.value=== ''){
                alert('Введите дату рождения!');
            }
            if(soglasie.checked=== false){
                alert('Подтвердите согласие!');
            }
        if(gender.value=== ''){
                alert('Выберите пол!');
            }
        if(body.value=== ''){
                alert('Выберите количество конечностей!');
            }
    }

    function formValidate(form) {
        let error =0;
        let formReq = document.querySelectorAll('._req');

        for (let index=0; index<formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type")==="checkbox"&&input.checked ===false){
                formAddError(input);
                error++;
            }else{
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input){
        return !/^\w+([\.-]&\w+)*@\w+([\.-]?\w)*(\.\w{2,8})+$/.test(input.value);
    }
   function dateTest(input){
   return !/^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{4})$/.test(input.value);
    }
