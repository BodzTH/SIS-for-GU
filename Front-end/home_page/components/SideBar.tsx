import SideCategory from "./SideCategory";

function SideBar() {
    return (
        <div className=" flex-Start p-14 sidebar">
            <div>
                <button>
                    <span>Categories</span>
                </button>
                <SideCategory />
            </div>

            {/* Rest of fixed elements */}
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default SideBar;