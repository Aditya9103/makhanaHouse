import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Image as ImageIcon, Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { 
    useGetProductDetailsQuery, 
    useCreateProductMutation,
    useUpdateProductMutation 
} from "../../store/api/productApiSlice";
import { useUploadFileMutation } from "../../store/api/uploadApiSlice";

export default function AdminProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const { data: product, isLoading, error } = useGetProductDetailsQuery(id, { skip: isNew });
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [uploadFile] = useUploadFileMutation();

    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formError, setFormError] = useState(null);

    // Form State
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [brand, setBrand] = useState('Makhana House');
    const [category, setCategory] = useState('Roasted Makhana');
    const [tag, setTag] = useState('');
    const [badge, setBadge] = useState('');
    const [description, setDescription] = useState(['']);
    const [ingredients, setIngredients] = useState('');
    const [shelfLife, setShelfLife] = useState('6 Months');
    const [isFeatured, setIsFeatured] = useState(false);
    
    // Arrays & Objects
    const [images, setImages] = useState([]);
    const [variations, setVariations] = useState([{ weight: '250g', price: 0, countInStock: 0 }]);
    const [badges, setBadges] = useState([]);
    const [highlights, setHighlights] = useState([]);
    const [nutritionalInfo, setNutritionalInfo] = useState([
        { label: 'Energy', value: '' },
        { label: 'Protein', value: '' },
        { label: 'Carbohydrates', value: '' },
    ]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product && !isNew) {
            setName(product.name);
            setSlug(product.slug);
            setBrand(product.brand);
            setCategory(product.category);
            setTag(product.tag || '');
            setBadge(product.badge || '');
            setDescription(product.description?.length ? product.description : ['']);
            setIngredients(product.ingredients || '');
            setShelfLife(product.shelfLife || '');
            setIsFeatured(product.isFeatured);
            setImages(product.images || []);
            setVariations(product.variations?.length ? product.variations : [{ weight: '250g', price: 0, countInStock: 0 }]);
            setBadges(product.badges || []);
            setHighlights(product.highlights || []);
            if (product.nutritionalInfo?.length) {
                setNutritionalInfo(product.nutritionalInfo);
            }
        }
    }, [product, isNew]);

    const handleGenerateSlug = () => {
        if (name) {
            setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            setIsUploading(true);
            const uploadedUrls = [];
            
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('folder', 'products');

                const res = await uploadFile(formData).unwrap();
                uploadedUrls.push(res.url);
            }
            
            setImages(prev => [...prev, ...uploadedUrls]);
        } catch (err) {
            alert(err?.data?.message || 'Image upload failed');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, idx) => idx !== indexToRemove));
    };

    const addVariation = () => {
        setVariations([...variations, { weight: '', price: 0, countInStock: 0 }]);
    };

    const updateVariation = (index, field, value) => {
        const newVariations = [...variations];
        newVariations[index][field] = value;
        setVariations(newVariations);
    };

    const removeVariation = (index) => {
        if (variations.length === 1) return alert("Must have at least one variation");
        setVariations(variations.filter((_, idx) => idx !== index));
    };

    // Generic Array Handlers
    const addArrayItem = (setter, emptyItem) => setter(prev => [...prev, emptyItem]);
    const updateArrayItem = (setter, index, field, value) => {
        setter(prev => {
            const next = [...prev];
            if (field) next[index][field] = value;
            else next[index] = value;
            return next;
        });
    };
    const removeArrayItem = (setter, index) => setter(prev => prev.filter((_, idx) => idx !== index));

    const submitHandler = async (e) => {
        e.preventDefault();
        setFormError(null);
        const productData = {
            name, slug, brand, category, tag, badge, description, ingredients, shelfLife, isFeatured, images, variations, badges, highlights, nutritionalInfo
        };

        try {
            if (isNew) {
                await createProduct(productData).unwrap();
                alert('Product created successfully');
                navigate('/admin/products');
            } else {
                await updateProduct({ ...productData, productId: id }).unwrap();
                alert('Product updated successfully');
            }
        } catch (err) {
            const rawMessage = err?.data?.message || err.error || 'Operation failed';
            // Parse mongoose validation error if present
            let parsedMessage = rawMessage;
            if (rawMessage.includes('validation failed')) {
                const parts = rawMessage.split(':').slice(1).join(':').split(',');
                parsedMessage = parts.map(p => p.trim()).filter(Boolean).join(' • ');
            } else if (rawMessage.includes('duplicate key error')) {
                parsedMessage = 'A product with this Slug or Name already exists.';
            }
            setFormError(parsedMessage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isLoading) return <div className="p-8 text-cyan-400">Loading product data...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading product</div>;

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/admin/products" className="p-2 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-serif text-[#f8f9fa] mb-1">
                            {isNew ? 'Create New Product' : 'Edit Product'}
                        </h1>
                        <p className="text-sm text-[#e4e4e7]/70">
                            {isNew ? 'Add a new product to your catalog' : `Editing: ${name}`}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={submitHandler}
                    disabled={isCreating || isUpdating}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-cyan-400 text-[#080b14] text-[13px] font-medium hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0 disabled:opacity-70"
                >
                    {(isCreating || isUpdating) ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isNew ? 'Save Product' : 'Update Product'}
                </button>
            </div>

            {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md flex items-start gap-3">
                    <div className="mt-0.5 font-bold">Error:</div>
                    <div className="text-[13px] leading-relaxed">{formError}</div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Info */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <h2 className="text-lg font-serif text-[#f8f9fa] mb-4">Basic Information</h2>
                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Product Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">URL Slug</label>
                                    <button type="button" onClick={handleGenerateSlug} className="text-xs text-cyan-400 hover:underline">Generate from Name</button>
                                </div>
                                <input 
                                    type="text" 
                                    required 
                                    value={slug} 
                                    onChange={(e) => setSlug(e.target.value)} 
                                    className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Category</label>
                                    <select 
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all"
                                    >
                                        <option value="Roasted Makhana" className="bg-[#080b14]">Roasted Makhana</option>
                                        <option value="Raw Makhana" className="bg-[#080b14]">Raw Makhana</option>
                                        <option value="Flavored Makhana" className="bg-[#080b14]">Flavored Makhana</option>
                                        <option value="Makhana Value Added" className="bg-[#080b14]">Makhana Value Added</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Brand</label>
                                    <input 
                                        type="text" 
                                        value={brand} 
                                        onChange={(e) => setBrand(e.target.value)} 
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Product Tag (e.g. "Super Quality")</label>
                                    <input 
                                        type="text" 
                                        value={tag} 
                                        onChange={(e) => setTag(e.target.value)} 
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Badge (e.g. "Bestseller")</label>
                                    <input 
                                        type="text" 
                                        value={badge} 
                                        onChange={(e) => setBadge(e.target.value)} 
                                        className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[12px] font-medium text-[#f8f9fa]">Description (Bullets)</label>
                                    <button 
                                        type="button" 
                                        onClick={() => addArrayItem(setDescription, '')}
                                        className="flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                                    >
                                        <Plus size={12} /> Add Point
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {description.map((desc, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <textarea 
                                                rows="2"
                                                value={desc} 
                                                onChange={(e) => updateArrayItem(setDescription, idx, null, e.target.value)} 
                                                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                            ></textarea>
                                            <button 
                                                type="button"
                                                onClick={() => removeArrayItem(setDescription, idx)}
                                                className="p-2 h-fit mt-1 rounded text-red-400 hover:bg-red-500/20"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Variations */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-serif text-[#f8f9fa]">Pricing & Weight Variations</h2>
                            <button 
                                type="button" 
                                onClick={addVariation}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-cyan-400 hover:bg-white/10 text-xs font-medium transition-colors"
                            >
                                <Plus size={14} /> Add Variation
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            {variations.map((v, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02]">
                                    <div className="flex-1 space-y-1">
                                        <label className="text-[11px] text-[#e4e4e7]/70">Weight (e.g. 250g, 1kg)</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={v.weight} 
                                            onChange={(e) => updateVariation(index, 'weight', e.target.value)} 
                                            className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-[13px] text-white outline-none focus:border-cyan-400/50" 
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-[11px] text-[#e4e4e7]/70">Price (₹)</label>
                                        <input 
                                            type="number" 
                                            required 
                                            min="0"
                                            value={v.price} 
                                            onChange={(e) => updateVariation(index, 'price', e.target.value)} 
                                            className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-[13px] text-white outline-none focus:border-cyan-400/50" 
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-[11px] text-[#e4e4e7]/70">Stock Count</label>
                                        <input 
                                            type="number" 
                                            required 
                                            min="0"
                                            value={v.countInStock} 
                                            onChange={(e) => updateVariation(index, 'countInStock', e.target.value)} 
                                            className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-[13px] text-white outline-none focus:border-cyan-400/50" 
                                        />
                                    </div>
                                    <div className="flex items-end pb-1">
                                        <button 
                                            type="button"
                                            onClick={() => removeVariation(index)}
                                            className="p-2 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Images, Nutrition & Settings */}
                <div className="flex flex-col gap-6">
                    
                    {/* Images */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <h2 className="text-lg font-serif text-[#f8f9fa] mb-4">Product Images</h2>
                        <div className="flex flex-col gap-4">
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-2">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#0a0d14] aspect-square">
                                            <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeImage(idx)}
                                                    className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="w-full py-4 border-2 border-dashed border-white/10 hover:border-cyan-400/50 rounded-lg flex flex-col items-center justify-center gap-2 text-[#e4e4e7]/70 hover:text-cyan-400 transition-colors disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 size={24} className="animate-spin" /> : <ImageIcon size={24} />}
                                <span className="text-xs font-medium">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-serif text-[#f8f9fa]">Product Badges</h2>
                            <button 
                                type="button" 
                                onClick={() => addArrayItem(setBadges, { icon: 'Star', label: '' })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-cyan-400 hover:bg-white/10 text-xs font-medium transition-colors"
                            >
                                <Plus size={14} /> Add Badge
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {badges.map((b, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Icon Name (e.g. Leaf, Flame)"
                                        value={b.icon} 
                                        onChange={(e) => updateArrayItem(setBadges, idx, 'icon', e.target.value)} 
                                        className="w-1/3 rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Label (e.g. 100% Natural)"
                                        value={b.label} 
                                        onChange={(e) => updateArrayItem(setBadges, idx, 'label', e.target.value)} 
                                        className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeArrayItem(setBadges, idx)}
                                        className="p-2 rounded text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-serif text-[#f8f9fa]">Highlights</h2>
                            <button 
                                type="button" 
                                onClick={() => addArrayItem(setHighlights, { icon: 'Check', label: '' })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-cyan-400 hover:bg-white/10 text-xs font-medium transition-colors"
                            >
                                <Plus size={14} /> Add Highlight
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {highlights.map((h, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Icon Name (e.g. Shield)"
                                        value={h.icon} 
                                        onChange={(e) => updateArrayItem(setHighlights, idx, 'icon', e.target.value)} 
                                        className="w-1/3 rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Label (e.g. Premium Quality)"
                                        value={h.label} 
                                        onChange={(e) => updateArrayItem(setHighlights, idx, 'label', e.target.value)} 
                                        className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeArrayItem(setHighlights, idx)}
                                        className="p-2 rounded text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nutritional Info */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-serif text-[#f8f9fa]">Nutritional Info</h2>
                            <button 
                                type="button" 
                                onClick={() => addArrayItem(setNutritionalInfo, { label: '', value: '' })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-cyan-400 hover:bg-white/10 text-xs font-medium transition-colors"
                            >
                                <Plus size={14} /> Add Row
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {nutritionalInfo.map((info, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            placeholder="Label (e.g. Energy)"
                                            value={info.label} 
                                            onChange={(e) => updateArrayItem(setNutritionalInfo, idx, 'label', e.target.value)} 
                                            className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            placeholder="Value (e.g. 347 kcal)"
                                            value={info.value} 
                                            onChange={(e) => updateArrayItem(setNutritionalInfo, idx, 'value', e.target.value)} 
                                            className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white outline-none focus:border-cyan-400/50" 
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => removeArrayItem(setNutritionalInfo, idx)}
                                        className="p-2 rounded text-red-400 hover:bg-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="rounded-xl border border-white/10 bg-[#080b14]/80 backdrop-blur-md p-6 shadow-sm">
                        <h2 className="text-lg font-serif text-[#f8f9fa] mb-4">Additional Details</h2>
                        <div className="flex flex-col gap-4">
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Ingredients</label>
                                <textarea 
                                    rows="2"
                                    value={ingredients} 
                                    onChange={(e) => setIngredients(e.target.value)} 
                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                ></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-medium text-[#f8f9fa]">Shelf Life</label>
                                <input 
                                    type="text" 
                                    value={shelfLife} 
                                    onChange={(e) => setShelfLife(e.target.value)} 
                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-[#f8f9fa] focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all" 
                                />
                            </div>
                            <div className="pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                        type="checkbox" 
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="accent-cyan-400 w-4 h-4 cursor-pointer" 
                                    />
                                    <span className="text-[13px] font-medium text-[#e4e4e7] group-hover:text-cyan-400 transition-colors">
                                        Feature this product on homepage
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
