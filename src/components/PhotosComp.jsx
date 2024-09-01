import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paginate from "./Paginate";


const PhotosComp = () => {
    const [photos, setPhotos] = useState([]);
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    //const [hover, setHover] = useState(false);
    const [photosPerPage] = useState(10);
    const { albumId } = useParams();

    useEffect(() => {
      const fetchPhotos = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
         .then(response => response.json())
         .then(data => setPhotos(data))
         .catch(error => console.error("Error:", error))
         .finally(() => setLoading(false));
      };
      const fetchAlbum = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
         .then(response => response.json())
         .then(data => setAlbum(data))
         .catch(error => console.error("Error:", error))
         .finally(() => setLoading(false));
      }
      fetchPhotos();
      fetchAlbum();
    }, [albumId]);

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
  return (
    <div className="photos">
        <div className="photos-title">
            <h2 className="photos-title-header">Album: {album.title}</h2>
        </div>
        {loading ? 
        <div className="photos-body">
            <p>Loading...</p>
        </div> 
        : (
          <div className="display">
            <div className="photos-grid">
                {currentPhotos && currentPhotos.map(photo => {
                    let title = '';
                    if (photo.title.length > 40) {
                         title = photo.title.substring(0, 40) + '...';
                    } else {
                         title = photo.title;
                    } 
                    return (
                        <div key={photo.id} 
                            className="photos-grid-image"
                            
                        >
                            <img src={photo.url} alt={photo.title} className="rounded-md" />
                            <span className="photos-grid-image-title">{title}</span>
                            
                        </div>
                    )
                })}
            </div>
            <div className="photos-body">
              <Paginate 
                totalItems={photos.length}
                itemsPerPage={photosPerPage}
                paginate={paginate}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default PhotosComp