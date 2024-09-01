import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paginate from "./Paginate";


const AlbumsComp = () => {
    const [albums, setAlbums] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosCount, setPhotosCount] = useState({});
    const [albumsPerPage] = useState(5);
    const { userId } = useParams();

    useEffect(() => {
      const fetchAlbums = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
         .then(response => response.json())
         .then(data =>  setAlbums(data))
         .catch(error => console.error('Error:', error))
         .finally(() => setLoading(false));
      };
      const fetchUser = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
         .then(response => response.json())
         .then(data => setUser(data))
         .catch(error => console.error('Error:', error))
         .finally(() => setLoading(false));
      };
      fetchUser();
      fetchAlbums();
    }, [userId]);

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
      const countPhotos = async(albumId) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
        const data = await response.json();
        return data.length;
      };

      const fetchPhotosCount = async() => {
        const counts = {};
        for (const album of currentAlbums) {
          const count = await countPhotos(album.id);
          counts[album.id] = count;
        }
        setPhotosCount(counts);
      }
      fetchPhotosCount();
    }, [currentAlbums]);
    
    
  return (
    <div className="albums">
        <div className="albums-title">
            <h2 className="albums-title-header">{user?.name} Photo Albums</h2>
        </div>
        {loading ? (
          <div className="albums-body">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="display">
            {currentAlbums && (
                currentAlbums.map(album => {
                    const photos =  photosCount[album.id]?? 'Loading...'
                    return (
                        <div key={album.id} className="albums-body">
                            <span className="albums-body-item">{album.title}</span>
                            <Link to={`/albums/photos/${album?.id}`} className="albums-body-link">Photos: {photos}</Link>
                        </div>
                    )
                })
            )}
            <div className="albums-body">
                <Paginate 
                    totalItems={albums.length}
                    itemsPerPage={albumsPerPage}
                    paginate={paginate}
                />
            </div>
          </div>
        )
        }
    </div>
)
}

export default AlbumsComp