/*************  ✨ Codeium Command 🌟  *************/
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Star, Filter } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsProps {
  initialReviews: Review[];
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const { id = '' } = useParams() || {};
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const API_BASE_URL =  'https://campuscartbackend.onrender.com';

  useEffect(() => {
    if (!id) {
      toast.error('Product ID is missing.');
    }
  }, [id]);

  useEffect(() => {
    if (selectedRating === null) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(review => review.rating === selectedRating);
      setFilteredReviews(filtered);
    }
  }, [selectedRating, reviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      toast.error('Invalid product ID.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/products/${id}/reviews`, newReview);
      if (response.data && response.data.success) {
        setReviews([...reviews, response.data.review]);
        setNewReview({ userName: '', rating: 5, comment: '' });
        toast.success('Review submitted successfully!');
      } else {
        throw new Error('Failed to submit review.');
      }
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const handleFilterRating = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-mono text-black">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="font-mono text-black text-sm">Filter by:</span>
          <div className="flex gap-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
              key={`filter-rating-${rating}`}
                
                variant="outline"
                className={`px-3 py-1 font-mono border-2 ${
                  selectedRating === rating 
                    ? 'border-black bg-black text-white' 
                    : 'border-black bg-white text-black'
                }`}
                onClick={() => handleFilterRating(rating)}
              >
                {rating} ★
              </Button>
            ))}
            {selectedRating !== null && (
              <Button
                variant="outline"
                className="px-3 py-1 font-mono border-2 border-black"
                onClick={() => setSelectedRating(null)}
              >
                Clear
              </Button>
            )}
         
          </div>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-8 font-mono text-gray-500">
          No reviews found for this rating
        </div>
      ) : (
        filteredReviews.map((review) => (
          <div
            key={review.id}
            className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-between text-black items-center mb-2">
              <span className="font-mono font-bold">{review.userName}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="font-mono text-black">{review.comment}</p>
            <p className="text-sm text-gray-500 font-mono mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}

      <form
        onSubmit={handleSubmitReview}
        className="space-y-4 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <h3 className="text-xl font-bold font-mono text-black">Write a Review</h3>
        <Input
          type="text"
          placeholder="Your Name"
          value={newReview.userName}
          onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
          required
          className="font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black border-2 border-black"
        />
        <div className="flex items-center space-x-2">
          <span className="font-mono text-black">Rating:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 cursor-pointer ${
                i < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
            />
          ))}
        </div>
        <Textarea
          placeholder="Your Review"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
          className="font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black border-2 border-black"
        />
        <Button
          type="submit"
          className="w-full bg-black bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-none font-mono border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}
/******  66f1f9b4-0245-4d56-865a-84c06af15e95  *******/