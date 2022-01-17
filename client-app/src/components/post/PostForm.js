import { Form, Button, Image } from "semantic-ui-react";

const PostForm = ({
  subject,
  setSubject,
  selectedImage,
  caption,
  setCaption,
  currentPostId,
  handleSumbit,
  removeSelectedImage,
  imageChange,
  cancelEdit,
  isEditOpen,
  setIsEditOpen,
}) => {
  return (
    <Form onSubmit={handleSumbit}>
      <Form.Input
        width={4}
        label="Subject"
        type="text"
        placeholder="Enter post subject..."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Form.Input accept="image/*" type="file" onChange={imageChange} />
      {selectedImage && (
        <div>
          <Image src={URL.createObjectURL(selectedImage)} size="small" />
          <Button negative onClick={removeSelectedImage}>
            Remove image
          </Button>
        </div>
      )}
      <Form.TextArea
        rows={5}
        width={6}
        label="Caption"
        type="text"
        placeholder="Enter caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Button positive type="submit">
        {/* {currentPostId === null ? "Update" : "Post"} not working*/}
        Post
      </Button>
      {isEditOpen && (
        <Button negative onClick={() => cancelEdit()}>
          Cancel Edit
        </Button>
      )}
    </Form>
  );
};

export default PostForm;