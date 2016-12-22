(function(){
     var app = {
         initialize: function () {
             this.setUpListeners();
         },

        setUpListeners: function () {
            $('form').on('submit',app.submitForm);
           // $('form').on('change','input',app.removeError());
        },

        submitForm: function (e) {
           // e.preventDefault();
            var form = $(this);
            if(app.validateForm(form)===false) return false;
            console.log('go in ajax');
        },

        validateForm: function (form) {
            var inputs = form.find('input');
            var valid = true;
            inputs.tooltip('destroy');
            $.each(inputs, function (index, val) {
                var input = $(val),
                    val = input.val(),
                    formGroup = input.parents('.form-group'),
                    label = formGroup.find('label').text().toLowerCase(),
                    textError = 'Введите ' + label;
                if (val.length === 0) {
                    //formGroup.addClass('has-error').removeClass('has-success');
                    input.tooltip({
                        trigger: 'manual',
                        placement: 'right',
                        title: textError
                    }).tooltip('show');
                    valid = false;
                } else {
                    input.tooltip('hide');
                    //formGroup.addClass('has-success').removeClass('has-error');
                    //valid = true;
                }
            });
            return valid;
        },
         removeError: function () {
             $(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
         }
     }
     app.initialize();
 }());