//ensure the html file loads completely to start any javascript functions or features
document.addEventListener('DOMContentLoaded', function () {
    
    //MODAL SETUP SCRIPT
    //A)get modal elements references
    var profileModalEl   = document.getElementById('profileModal');
  var profileForm      = document.getElementById('profileForm');
  var profileNameInput = document.getElementById('profileNameInput');
  var profilePicInput  = document.getElementById('profilePicInput');
  var avatarPreviewWrap= document.getElementById('avatarPreviewWrap');
  var avatarPreview    = document.getElementById('avatarPreview');   // preview inside modal

  // These are the elements IN THE HEADER that we update after submit
  var headerAvatar     = document.querySelector('.profile-avatar');  // the header profile img
  var headerName       = document.querySelector('.profile-name');    // the <h1> with the name


  // B). Open the modal automatically when the page loads --
  //
  // use Bootstrap's Modal API to show it.
  // data-bs-backdrop="static" (set in HTML) means clicking outside won't close it.

  var profileModal = new bootstrap.Modal(profileModalEl);
  profileModal.show();


  // C). Clicking the avatar preview opens the file picker --
  //
  // When the user clicks the circular avatar in the modal it will trigger a click on the hidden <input type="file">.

  avatarPreviewWrap.addEventListener('click', function () {
    profilePicInput.click();
  });


  // D). When a file is chosen, preview it in the modal --
  //
  // FileReader reads the image file from the user's device and converts it into a data URL (a base64 string) that can be set as the src of an <img> tag.

  profilePicInput.addEventListener('change', function () {
    var file = profilePicInput.files[0];  // get the first selected file

    // Only proceed if a file was actually selected and it's an image
    if (file && file.type.startsWith('image/')) {

      var reader = new FileReader();

      // This runs when FileReader finishes reading the file
      reader.onload = function (event) {
        // Set the modal avatar preview to the chosen image
        avatarPreview.src = event.target.result;
      };

      // Tell FileReader to read the file as a data URL
      reader.readAsDataURL(file);
    }
  });


  // E). Handle form submission --
  //
  // When the user clicks "Let's Go" the site will :
  //   1. Validate that a name was entered
  //   2. Update the header <h1> with the typed name
  //   3. Update the header avatar with the chosen image (if any)
  //   4. Close the modal

  profileForm.addEventListener('submit', function (event) {
    event.preventDefault();  // stop the form from reloading the page

    // Check if the name field is empty
    if (!profileNameInput.value.trim()) {
      // Show Bootstrap's validation styles (red border + error message)
      profileForm.classList.add('was-validated');
      return;  // stop here — don't close the modal
    }

    // ── Update the header name ──
    // Take the typed name, trim extra spaces, and put it in the <h1>
    var typedName = profileNameInput.value.trim();
    headerName.textContent = typedName;

    // ── Update the header avatar ──
    // If the modal preview was changed (i.e. user uploaded a photo) copy that image src across to the main header avatar.
    var defaultAvatarSrc = 'assets/default-profile.jpeg';  // placeholder base source pic

    if (!avatarPreview.src.includes(defaultAvatarSrc)) {
      // if user uploaded a custom photo use it in the header
      headerAvatar.src = avatarPreview.src;
      headerAvatar.alt = typedName + "'s profile photo";
    } else {
      // No photo uploaded — generate a nice initial-based placeholder ui-avatars.com creates an avatar image from the user's initials
      headerAvatar.src = 'https://ui-avatars.com/api/?name='
        + encodeURIComponent(typedName)
        + '&background=2e3328&color=c8a84b&size=128';
      headerAvatar.alt = typedName + "'s profile photo";
    }

    // ── Close the modal ──
    profileModal.hide();
  });

});