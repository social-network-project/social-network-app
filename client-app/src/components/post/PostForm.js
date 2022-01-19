import { Form, Button, Image, Icon, Segment } from "semantic-ui-react";

const PostForm = ({
  title,
  setTitle,
  selectedImage,
  caption,
  setCaption,
  handleSumbit,
  removeSelectedImage,
  imageChange,
  cancelEdit,
  isEditOpen,
}) => {
  return (
    <Form onSubmit={handleSumbit}>
      <Form.Group>
        <Form.Input
          required
          size="small"
          width={4}
          label="Title"
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Input
          required
          size="small"
          width={5}
          label="Image"
          accept="image/*"
          type="file"
          onChange={imageChange}
          //value={!selectedImage ? "" : selectedImage}
        />
        <Form.TextArea
          required
          rows={4}
          width={7}
          label="Caption"
          type="text"
          placeholder="Enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </Form.Group>
      {selectedImage && (
        <Segment>
          <Button
            negative
            onClick={removeSelectedImage}
            floated="right"
            size="mini"
          >
            <Icon name="delete" style={{ margin: "0px" }} />
          </Button>
          <Image
            src={URL.createObjectURL(selectedImage)}
            size="medium"
            centered
            rounded
          />
        </Segment>
      )}
      <Segment textAlign="right" style={{ boxShadow:"none" ,border:"none" }}>
        <Button positive type="submit" >
          <Icon name="world" />
          {/* {currentPostId === null ? "Update" : "Post"} not working*/}
          New Post
        </Button>
      </Segment>

      {isEditOpen && (
        <Button negative onClick={() => cancelEdit()}>
          Cancel Edit
        </Button>
      )}
    </Form>
  );
};

export default PostForm;
