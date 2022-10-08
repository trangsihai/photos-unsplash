import { Divider, Spin } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Gallery from "react-photo-gallery";
import unsplash from "../../services";
import ReviewImage from "./components/ReviewImage";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [indexPhoto, setIndexPhoto] = useState(undefined);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const data = await unsplash.search.getPhotos({
        page: pagination.page,
        perPage: 20,
        query: "a",
        orientation: "landscape",
      });
      setData((state) => [
        ...state,
        ...data?.response?.results?.map((v) => ({
          ...v,
          src: v.urls.small, //use samll for load performance
          preview: v.urls.regular, // use regular for preview photo
        })),
      ]);
      setPagination({
        page: pagination.page + 1,
        total: data?.response?.total,
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="scrollableDiv"
      className="max-w-[1440px] h-screen m-auto p-4 overflow-auto"
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < pagination.total}
        loader={
          <div className="text-center">
            <Spin spinning={true}></Spin>
          </div>
        }
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Gallery
          photos={data}
          onClick={(_, photo) => setIndexPhoto(photo.index)}
        />
      </InfiniteScroll>
      <ReviewImage
        photos={data}
        indexPhoto={indexPhoto}
        onChangeIndexPhoto={setIndexPhoto}
      />
    </div>
  );
}

export default Dashboard;
