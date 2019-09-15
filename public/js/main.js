$(document).ready(function () {
    init();
});

function init(){
    enable();
}

function enable () {
  $('.clrForm').on('click', clrForm);
  deleteUser();
  deleteStdMessage();
  deleteGroup();
  deleteMessage();
  deleteTeam();
  deleteCustomer();
  histTable();
  dismissAlert();
  // $('.addNum').on('click', addNumFields);
  // $('.removeNum').on('click', remNumFields);
}

// Reset Form Button
function clrForm() {
    document.getElementById("txtForm").reset();
}

function dismissAlert() {
    window.setTimeout(function() {
        $(".alert-dismissible").fadeTo(1000, 0).slideUp(1000, function(){
            $(this).remove(); 
        });
    }, 5000);
}
// Delete User Button
function deleteUser () {
    $('.delete-user').on('click', function (user) {
        $target = $(user.target);
        var id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/users/delete/'+id,
            success: function (response) {
            req.flash('success', 'User deleted!');
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

function deleteStdMessage () {
    $('.deleteStdMessage').on('click', function (message) {
        $target = $(message.target);
        var id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/admin/messages/delete/'+id,
            success: function (response) {
            location.reload(true);
            // req.flash('success', 'Group deleted!');
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

function deleteGroup () {
    $('.deleteGroup').on('click', function (event) {
        $target = $(event.target);
        var id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/admin/groups/delete/'+id,
            success: function (response) {
            // req.flash('success', 'Group deleted!');
            location.reload(true);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

function deleteTeam () {
    $('.deleteTeam').on('click', function (event) {
        $target = $(event.target);
        var id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/admin/teams/delete/'+id,
            success: function (response) {
                // req.flash('success', 'Team deleted!');
                location.reload(true);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

function deleteCustomer () {
    $('.deleteCustomer').on('click', function (event) {
        $target = $(event.target);
        var id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/admin/customers/delete/'+id,
            success: function (response) {
                // req.flash('success', 'Team deleted!');
                location.reload(true);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
}

function deleteMessage () {
    $('.delete-msg').on('click', function (response) {
          $target = $(response.target);
          var sid = $target.attr('data-sid');

          $.ajax({
              type:'DELETE',
              url: '/twilio/delete/'+sid,
              success: function (response) {
                location.reload(true);
                req.flash('success', 'Message deleted!');
              },
              error: function (err) {
                  console.log(err);
              }
          });
      });
}

function histTable() {
$('#histlog').DataTable({
  "order": [[ 0, "desc" ]]
});
}

// -------------UNUSED FUNCTIONS--------------------- //
// Counts number of character in text message preview
function textareaCount () {
    let text_max = 122;
    $('.previewMsg_Count').html(text_max + ' characters remaining');
    $('.previewMsg').keyup(function () {
        let text_length = $('.previewMsg').val().length;
        let text_remaining = text_max - text_length;
        $('.previewMsg_Count').html(text_remaining + ' characters remaining');
    });
}

// Adds additional 'To #' Field on Messages page
function addNumFields () {
    $('.multiFieldWrapper').each(function() {
      $('.multiField:first-child .removeNum', $('.multiFields', this)).attr('hidden',false)
      $('.multiField:first-child', $('.multiFields', this)).clone(true).appendTo($('.multiFields', this)).find('input').val('').focus();
      $('.multiField:first-child .removeNum', $('.multiFields', this)).attr('hidden',true)
    });
}

// Removes additional 'To #' Fields added to Messages Page
function remNumFields () {
    $(this).parent('.multiField').remove();
}
