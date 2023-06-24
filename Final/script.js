$(document).ready(function() {
    let comments = []; // Array to store comments
    let nextCommentId = 1; // Counter for assigning comment IDs
  
    // Function to render comments
    function renderComments() {
      $('#commentsList').empty();
      comments.forEach(function(comment) {
        const commentHtml = `
          <div class="comment" data-comment-id="${comment.id}">
          <div class="comment-avatar">
                <img src="./images/avatar.png" alt="Avatar">
         </div>
            <h3>${comment.displayName}</h3>
            <p class="comment-text">${comment.commentText}</p>
            <div class="actions">
              <button class="editBtn">Edit</button>
              <button class="deleteBtn">Delete</button>
            </div>
            <div class="edit-row" style="display: none;">
              <div class="input-container">
                <input type="text" class="edit-input">
                <button class="submitBtn">Submit</button>
              </div>
            </div>
          </div>
        `;
        $('#commentsList').prepend(commentHtml);
      });
    }
  
    // Function to handle comment submission
    function submitComment(displayName, commentText) {
      const comment = {
        id: nextCommentId++,
        displayName: displayName,
        commentText: commentText
      };
      comments.unshift(comment); // Add the new comment to the beginning of the array
      renderComments(); // Render the updated comments
    }
  
    // Function to handle comment deletion
    function deleteComment(commentId) {
      comments = comments.filter(comment => comment.id !== commentId); // Remove the comment from the array
      renderComments(); // Render the updated comments
    }
  
    // Function to handle comment editing
    function editComment(commentId) {
      const commentElement = $(`.comment[data-comment-id="${commentId}"]`);
      const commentTextElement = commentElement.find('.comment-text');
      const editRow = commentElement.find('.edit-row');
  
      if (editRow.hasClass('editing')) {
        // Submit the edited comment
        const editedCommentText = editRow.find('.edit-input').val();
        commentTextElement.text(editedCommentText);
        commentTextElement.show();
        editRow.hide();
        editRow.removeClass('editing');
      } else {
        // Enable editing mode
        const commentText = commentTextElement.text();
        editRow.find('.edit-input').val(commentText);
        editRow.show();
        editRow.addClass('editing');
      }
    }
  
    // Function to set the top margin of #commentsSection equal to the height of #originalPost
    function setCommentsSectionMargin() {
      var originalPostHeight = $('#originalPost').outerHeight();
      $('#commentsSection').css('margin-top', originalPostHeight);
    }
  
    // Call the function initially
    setCommentsSectionMargin();
  
    // Call the function on window resize to handle responsive changes
    $(window).on('resize', setCommentsSectionMargin);
  
    // Submit button for adding a new comment
    $('#commentForm').submit(function(event) {
      event.preventDefault();
      const displayName = $('#displayName').val();
      const commentText = $('#commentText').val();
      submitComment(displayName, commentText);
      $('#commentForm')[0].reset(); // Clear the form
    });
  
    // Delete button
    $(document).on('click', '.deleteBtn', function() {
      const commentId = $(this).closest('.comment').data('comment-id');
      deleteComment(commentId);
    });
  
    // Edit button
    $(document).on('click', '.editBtn', function() {
      const commentElement = $(this).closest('.comment');
    const commentId = commentElement.data('comment-id');
    editComment(commentId);
  });

  // submit button for edit mode
  $(document).on('click', '.submitBtn', function() {
    const commentElement = $(this).closest('.comment');
    const commentId = commentElement.data('comment-id');
    editComment(commentId);
  });
});