import Carousel, { Modal, ModalGateway } from "react-images";

const ReviewImage = ({ photos, indexPhoto, onChangeIndexPhoto }) => {
  const closeLightbox = () => {
    onChangeIndexPhoto(undefined);
  };

  return (
    <ModalGateway>
      {photos && indexPhoto !== undefined ? (
        <Modal onClose={closeLightbox}>
          <Carousel
            currentIndex={indexPhoto}
            views={photos.map((x) => ({
              ...x,
							src: x.preview,
              caption: <span className="text-2xl">{x.description}</span>,
            }))}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
};

export default ReviewImage;
