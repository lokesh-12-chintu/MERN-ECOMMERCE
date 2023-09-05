import "./index.css"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {getAllCategory} from "../../actions"

const MenuHeader = () => {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    },[])

    const renderCategories = (categories) => {
        let myCategory = []; 
        for(let category of categories){
            myCategory.push(
                <li key = {category.name} >
                    {
                        category.parentId ?  <a href = {`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> : 
                        <span>{category.name}</span>
                    }
                    {category.children.length > 0  ? (<ul>{renderCategories(category.children)}</ul>):null}
                </li>
            )
        }
        return myCategory
    }

    return(
        <div className = "menu-header">
            <ul>
                {
                    category.categories.length > 0 ? renderCategories(category.categories): null
                }
            </ul>
        </div>
    )
}

export default MenuHeader