import UrduProse from './ContentTypes/UrduProse';
import CalligraphyBox from './ContentTypes/CalligraphyBox';
import PersianBeyt from './ContentTypes/PersianBeyt';

const contentComponents = {
    urdu_prose: UrduProse,
    arabic_quote: CalligraphyBox,
    persian_poetry: PersianBeyt,
};

export default function ContentRenderer({ content }) {
    if (!content || !Array.isArray(content)) {
        return (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
                <p className="font-urdu">مواد دستیاب نہیں ہے</p>
            </div>
        );
    }

    return (
        <div className="content-container">
            {content.map((item, index) => {
                const Component = contentComponents[item.type];

                if (!Component) {
                    console.warn(`Unknown content type: ${item.type}`);
                    return (
                        <div key={index} className="p-4 my-4 bg-[var(--color-bg-secondary)] rounded-lg">
                            <p className="text-[var(--color-text-muted)] text-sm">
                                Unknown content type: {item.type}
                            </p>
                            <p className="mt-2">{item.text}</p>
                        </div>
                    );
                }

                return (
                    <Component
                        key={index}
                        index={index}
                        {...item}
                    />
                );
            })}
        </div>
    );
}
