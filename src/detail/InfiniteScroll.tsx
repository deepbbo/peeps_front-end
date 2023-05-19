import React, { useCallback } from 'react';
import throttle from 'lodash/throttle';
import { List, AutoSizer } from 'react-virtualized';
import PostFeed from './PostFeed';

// const InfiniteScroll = ({
//   next,
//   hasMore,
//   onScroll,
//   height,
//   loader,
//   dataLength,
//   children,
//   elementHeight,
//   rowRenderer
// }) => {
//   const [showLoader, setShowLoader] = useState(false);
//   let triggered = useRef(false);

//   useEffect(() => {
//     triggered.current = false;
//     setShowLoader(false);
//   }, [dataLength]);

//   const props = useRef({
//     next,
//     hasMore,
//     onScroll
//   });

//   const scrollListener = e => {
//     const { next, hasMore, onScroll } = props.current;
//     if (typeof onScroll === "function") {
//       setTimeout(() => onScroll && onScroll(e), 0);
//     }

//     const { clientHeight, scrollHeight, scrollTop } = e;

//     if (triggered.current) {
//       return;
//     }

//     const atBottom = scrollTop + clientHeight >= scrollHeight;

//     if (atBottom && hasMore) {
//       triggered.current = true;
//       setShowLoader(true);
//       next && next();
//     }
//   };

//   useEffect(() => {
//     props.current = {
//       next,
//       hasMore,
//       onScroll
//     };
//   }, [next, hasMore, onScroll]);

//   const throttleScrollListener = throttle(scrollListener, 150);

//   const isLoaderVisible = showLoader && hasMore;

//   return (
//     <div
//       style={{
//         position: "relative"
//       }}
//     >
//       <AutoSizer disableHeight>
//         {({ width }) => (
//           <List
//             rowCount={children.length}
//             width={width}
//             height={height}
//             rowHeight={elementHeight}
//             rowRenderer={rowRenderer}
//             overscanRowCount={5}
//             onScroll={throttleScrollListener}
//           />
//         )}
//       </AutoSizer>
//       <div
//         style={{
//           visibility: isLoaderVisible ? "visible" : "hidden",
//           position: isLoaderVisible ? "" : "absolute",
//           bottom: 0,
//           willChange: "scroll-position" // https://wit.nts-corp.com/2017/06/05/4571, but IE not supported
//         }}
//       >
//         {loader}
//       </div>
//     </div>
//   );
// };

const InfiniteScroll = () => {
  const rowRenderer = useCallback(() => {
    return <PostFeed />;
  }, []);

  return (
    <></>
    // <List
    //   className="List"
    //   width={512} // 전체 크기
    //   height={513} // 전체 높이
    //   rowHeight={57} // 항목 높이
    //   rowCount={5}
    //   rowRenderer={rowRenderer} // 항목 렌더링 시 쓰는 함수
    //   style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    // />
  );
};

export default InfiniteScroll;
