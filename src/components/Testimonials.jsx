import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import user_icon from '../assets/testimonials/user-icon.webp';


const Testimonials = () => {
  const itemsPerPage = 3;
  const initialBatchSize = 10; // จำนวนข้อมูลที่โหลดครั้งแรก
  const loadMoreBatchSize = 10; // จำนวนข้อมูลที่โหลดเพิ่มในแต่ละครั้ง
  const maxItems = 100; // จำนวนข้อมูลสูงสุดที่จะดึงจาก API

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [showNoMoreCard, setShowNoMoreCard] = useState(false);
  const [apiDataLoaded, setApiDataLoaded] = useState(false);
  const [apiConnectionFailed, setApiConnectionFailed] = useState(false);

  // ข้อมูลสำรองเมื่อไม่สามารถเชื่อมต่อ API ได้
  const fallbackData = [
    {
      id: 'fb-1',
      first_name: 'Somsak',
      last_name: 'Jaidee',
      text: 'The product quality exceeded my expectations. Will definitely purchase again!',
      user_img: null
    },
    {
      id: 'fb-2',
      first_name: 'Somchai',
      last_name: 'Rakdee',
      text: 'Customer service was outstanding. They went above and beyond to help resolve my issue.',
      user_img: null
    },
    {
      id: 'fb-3',
      first_name: 'Malee',
      last_name: 'Suksai',
      text: 'Fast delivery and excellent packaging. The product arrived in perfect condition.',
      user_img: null
    },
    {
      id: 'fb-4',
      first_name: 'Wichai',
      last_name: 'Thongdee',
      text: 'I love how easy it was to use this service. The interface is intuitive and user-friendly.',
      user_img: null
    },
    {
      id: 'fb-5',
      first_name: 'Pranee',
      last_name: 'Jitjai',
      text: 'This company truly understands customer needs. Their products are thoughtfully designed.',
      user_img: null
    },
    {
      id: 'fb-6',
      first_name: 'Apinya',
      last_name: 'Somjai',
      text: 'I have been using their services for years and have never been disappointed. Consistent quality!',
      user_img: null
    },
    {
      id: 'fb-7',
      first_name: 'Nattapong',
      last_name: 'Siriwan',
      text: 'The value for money is exceptional. You get premium quality without the premium price tag.',
      user_img: null
    },
    {
      id: 'fb-8',
      first_name: 'Chonticha',
      last_name: 'Ratana',
      text: 'Their attention to detail is impressive. Every aspect of the product shows careful craftsmanship.',
      user_img: null
    },
    {
      id: 'fb-9',
      first_name: 'Piyawat',
      last_name: 'Nakorn',
      text: 'I appreciate how environmentally conscious this company is. Sustainable packaging and ethical practices make me a loyal customer.',
      user_img: null
    }
  ];

  useEffect(() => {
    // โหลดข้อมูล fallback ก่อนเสมอ
    setData(fallbackData);
    setLoading(false);
    // ไม่โหลด API ตั้งแต่เริ่มต้น จะโหลดเมื่อเลื่อนถึงหน้าสุดท้ายเท่านั้น
  }, []);

  useEffect(() => {
    // ตรวจสอบว่าครบจำนวนสูงสุดแล้วหรือไม่
    if (data.length >= maxItems) {
      setNoMore(true);
      setShowNoMoreCard(true);
    }
  }, [data, maxItems]);

  const fetchInitialData = async () => {
    try {
      const initialLimit = Math.min(initialBatchSize, maxItems); // ขอข้อมูลไม่เกิน maxItems
      const response = await fetch(`https://cd1b01ca-c6a9-4a82-8abe-0b31111fdb95-00-hfn7hqcjc3ve.sisko.replit.dev/products?offset=0&limit=${initialLimit}`);
      //API URL
      //http://localhost/php_api/api.php
      //https://cd1b01ca-c6a9-4a82-8abe-0b31111fdb95-00-hfn7hqcjc3ve.sisko.replit.dev/products
      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
        setApiDataLoaded(true);

        // ตั้งค่า noMore เป็น true หากได้ข้อมูลน้อยกว่าที่ขอ หรือครบจำนวนที่กำหนดแล้ว
        if (result.length < initialLimit || result.length >= maxItems) {
          setNoMore(true);
          if (result.length >= maxItems) {
            setShowNoMoreCard(true);
          }
        }
      } else {
        console.error('API returned invalid data format');
        handleApiFailure();
      }
    } catch (err) {
      console.error('Failed to fetch initial data:', err);
      handleApiFailure();
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันจัดการเมื่อไม่สามารถเชื่อมต่อ API ได้
  const handleApiFailure = () => {
    setApiConnectionFailed(true);
    setNoMore(false); // ยังสามารถโหลดข้อมูลเพิ่มได้เมื่อกลับมาเชื่อมต่อได้
    console.log('Using fallback data due to API connection failure');
  };

  const fetchMoreData = async () => {
    // ถ้ากำลังโหลดอยู่หรือไม่มีข้อมูลเพิ่มแล้ว ไม่ต้องดึงเพิ่ม
    if (loadingMore || noMore) {
      return;
    }

    try {
      setLoadingMore(true);

      // หาจุดเริ่มต้นสำหรับการดึงข้อมูลเพิ่ม
      const offset = apiDataLoaded ? data.length - fallbackData.length : 0;
      const batchSize = loadMoreBatchSize;

      const response = await fetch(`https://cd1b01ca-c6a9-4a82-8abe-0b31111fdb95-00-hfn7hqcjc3ve.sisko.replit.dev/products?offset=${offset}&limit=${batchSize}`);
      //API URL
      //http://localhost/php_api/api.php
      //https://cd1b01ca-c6a9-4a82-8abe-0b31111fdb95-00-hfn7hqcjc3ve.sisko.replit.dev/products
      const newData = await response.json();

      if (Array.isArray(newData)) {
        if (newData.length === 0) {
          setNoMore(true); // ไม่มีข้อมูลเพิ่มเติมจาก API แล้ว
          setShowNoMoreCard(true);
        } else {
          // ถ้าเป็นการโหลด API ครั้งแรก ให้เพิ่มต่อท้าย fallbackData
          if (!apiDataLoaded) {
            setData([...fallbackData, ...newData]);
            setApiDataLoaded(true);
            setApiConnectionFailed(false);
          } else {
            // ถ้าเคยโหลดข้อมูลจาก API แล้ว ให้เพิ่มข้อมูลต่อท้าย
            setData(prevData => [...prevData, ...newData]);
            setApiConnectionFailed(false);
          }

          // ตรวจสอบว่าครบจำนวนสูงสุดหรือได้ข้อมูลน้อยกว่าที่ขอหรือไม่
          const totalItems = fallbackData.length + newData.length;
          if (totalItems >= maxItems || newData.length < batchSize) {
            setNoMore(true);
            if (totalItems >= maxItems) {
              setShowNoMoreCard(true);
            }
          }
        }
      } else {
        console.error('API returned invalid data format');
        setNoMore(true);
        setShowNoMoreCard(true);
      }
    } catch (err) {
      console.error('Failed to fetch more data:', err);
      setApiConnectionFailed(true);
    } finally {
      setLoadingMore(false);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentItems = () => {
    // ดึงข้อมูลสำหรับหน้าปัจจุบัน
    const items = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    // ถ้าเป็นหน้าสุดท้าย
    const isLastPage = page === totalPages - 1;

    if (isLastPage) {
      if (showNoMoreCard) {
        // หากครบจำนวนแล้ว แสดง "No more" card
        return [...items, {
          id: 'no-more',
          isNoMoreCard: true
        }];
      } else if (loadingMore) {
        // กำลังโหลดข้อมูลเพิ่ม แสดงข้อมูลปกติ
        return items;
      } else {
        // หน้าสุดท้าย และยังไม่ครบจำนวน โหลดข้อมูลเพิ่มโดยอัตโนมัติ
        return items;
      }
    }

    return items;
  };

  const currentItems = getCurrentItems();

  // เพิ่มฟังก์ชันเพื่อตรวจสอบว่าเป็นหน้าสุดท้ายหรือไม่
  const isLastPage = page === totalPages - 1;

  // โหลดข้อมูลเพิ่มเมื่อเลื่อนถึงหน้าสุดท้าย
  useEffect(() => {
    if (isLastPage && !noMore && !loadingMore) {
      fetchMoreData();
    }
  }, [page, isLastPage]);

  const goToPage = (index) => {
    // เปลี่ยนไปยังหน้าที่ต้องการ
    if (index >= 0 && index < totalPages) {
      setPage(index);
    }
  };

  const nextPage = () => {
    const nextPageIndex = page + 1;

    // ถ้ายังไปได้ ก็ไปหน้าถัดไป
    if (nextPageIndex < totalPages) {
      setPage(nextPageIndex);
    }
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">Reviews</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
            <span className="ml-3 text-gray-500 text-sm">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='review' className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium text-gray-800 text-center">Reviews</h2>
        <p className='mt-4 mb-8 text-sm text-center md:text-base lg:text-lg'>The Review Card Example demonstrates data fetching from an API using the Infinite Scroll feature, which automatically loads more content as the user scrolls to the end of the page.</p>

        {apiConnectionFailed && (
          <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-700 text-center">
            <p>Currently displaying fallback data. Will attempt to reconnect to API when loading more.</p>
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative max-w-8xl mx-auto">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-600 rounded-full shadow disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:shadow-md transition-all duration-200"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-wrap gap-4 justify-center items-center"
              >
                {currentItems.map((item) => (
                  item.isNoMoreCard ? (
                    // "No more" Card
                    <div
                      key="no-more-card"
                      className="w-full max-w-sm bg-white rounded-lg p-5 h-80 shadow-lg flex items-center justify-center transform transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02]"
                    >
                      <p className="text-gray-400 text-center">No more</p>
                    </div>
                  ) : (
                    // Normal Testimonial Card
                    <div
                      key={item.id}
                      className="flex items-center w-full max-w-sm bg-white rounded-lg h-80 shadow-lg transform transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer"
                    >
                      <div className="flex flex-col items-center p-5">
                        <div className="w-16 h-16 rounded-full bg-gray-100 mb-3 overflow-hidden">
                          <img
                            src={item.user_img || user_icon}
                            onError={(e) => { e.target.onerror = null; e.target.src = user_icon }}
                            alt={`${item.first_name} ${item.last_name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-600 italic mb-3 text-center px-5">" {item.text} "</p>
                        <p className="text-sm font-medium text-gray-800 text-center">{item.first_name} {item.last_name}</p>
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={page >= totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white text-gray-600 rounded-full shadow disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:shadow-md transition-all duration-200"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex justify-center items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${i === page
                ? 'w-4 bg-gray-600'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="mt-4 text-center text-sm">
          {loadingMore && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400 mr-2"></div>
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
        </div>

        {/* Try to reconnect button (when in fallback mode) */}
        {apiConnectionFailed && !loadingMore && (
          <div className="mt-6 text-center">
            <button
              onClick={() => fetchMoreData()}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Try to reconnect to API
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
